/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const admin = require('firebase-admin');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

admin.initializeApp();
const db = admin.firestore();
const stripe = require('stripe')(process.env.STRIPE_SECRET);


// Create and deploy your first functions
// Function to add a document with an auto-generated ID or given id
async function addDocument(collectionName, data,id=null) {
  let docRef = "";
  try {
    if (!id)
       docRef = await db.collection(collectionName).add(data);
    else {
       docRef = await db.collection(collectionName).doc(id);
       docRef.set(data);
    }

    return {"result" : "success"}; // if needed the auto-generated ID is: docRef.id 
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}

/*
//payoutData = {'amount' : amount_in_cents, 'connectAcctBankAcctId' : 'stripe id of connected account bank account', connectedAcctId :''}
const createPayout = async(payoutData) => {
    const payout = await stripe.payouts.create({
      amount: payoutData['amount'], // Amount in cents
      currency: 'usd',
      destination: payoutData['connectedAcctBankAcctId'],
    }, {
      stripeAccount: payoutData['connectedAcctId'],
    });
    return payout;
}*/

const getBalance = async(uid) => {
  let balance = 0;
  let pendingCredit = 0;
  let pendingDebit = 0;

  let collectionRef = await db.collection('assignedBounties')

  await collectionRef.where('hostId', '==', uid).get().then(snapshot => {
  if(snapshot.empty){return;}
  snapshot.forEach(doc => {
    let docData = doc.data();
    if(docData['status'] == 'completed') {
      balance += (docData['amount'] - 300) / 100;
    }
    else if(docData['status'] ==  'cancelled'){
      let cancelAmount = docData['amount'] > 500 ? 500 : docData['amount'];
      cancelAmount = cancelAmount > 150 ? cancelAmount - 150 : 0;
      balance += (cancelAmount)/100;
    }
    else if(['pending','confirmed'].indexOf(docData['status']) > 0){
      pendingCredit += (docData['amount'] - 300)/100;
    }

  })
  })
  try {
    collectionRef = await db.collection('payouts')
    await collectionRef.where('hostId', '==', uid).get().then(snapshot => {
    if(snapshot.empty){return;}
    snapshot.forEach(doc => {
      let docData = doc.data();
      if (docData['status'] == 'completed')
        balance -= docData['amount'] / 100;
      else if (docData['status'] == 'pending')
        pendingDebit -= docData['amount'] / 100;
    })
   });
  } catch(err){};
  return {'pendingCredit':pendingCredit, 'pendingDebit' : pendingDebit, 'balance': balance};   
}

const canPayout = async(uid,payoutData) => {
  let balance = await getBalance(uid);
  let worstCaseBalance = balance['balance'] + Math.min(balance['pendingDebit'],0) + 0.01;
  if(worstCaseBalance >= payoutData['amount']/100)
    return true;
  return false; 
}

//payoutData = {'amount' : amount_in_cents, 'connectAcctBankAcctId' : 'stripe id of connected account bank account', connectedAcctId :''}
const createPayout = async(uid, payoutData) => {
    let isValid = await canPayout(uid,payoutData);
    if (isValid){
       let serverTimestamp = admin.firestore.FieldValue.serverTimestamp();
       let payoutDoc = {amount: payoutData['amount'], 'status' : 'pending', destination: payoutData['connectedAcctBankAcctId'], stripeAccount : payoutData['connectedAcctId'],currency:'usd',timestamp : serverTimestamp, hostId : uid};
       addDocument('payouts',payoutDoc);
       return {'result' : 'success'}
    }
    else {
       return {'error' : 'Insufficient Balance!'}
    }
    return {'error' : 'Unknown Error'}
}

//hostData =  {'email' : 'user@blah.com'}
const createConnectedAccount = async(uid,hostData,ip) => {
    let timestamp = Math.floor(new Date().getTime() / 1000)
    let stripeData = {};
    let ownersNeeded = ["Multi Member LLC","Private Partnership","Private Corporation","Unincorporated Association"].indexOf(hostData['companyStructure']) >= 0;
    if(hostData['isCompany']) {
        stripeData = {
         type: 'custom',
         country: 'US',
         email: hostData['email'],
         business_type: hostData['companyType'].toLowerCase().replaceAll(" ","_"),
         tos_acceptance : {
            date : timestamp,
            ip : ip,
            service_agreement:'full',
         },
         business_profile: {
            mcc:hostData['mcc'],
            url:hostData['website'],
         },
         company: {
           name : hostData['name'],
           structure : hostData['companyStructure'].toLowerCase().replaceAll(" ","_"),
           directors_provided : false,
           executives_provided : false,
           tax_id : hostData['taxId'],
           phone: hostData['phoneNumber'],
           address : {
            line1 : hostData['addr1'],
            line2 : hostData['addr2'],
            city : hostData['city'],
            state: hostData['state'],
            postal_code : hostData['zip'],
            country: 'US',
           },
         },
         capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
           requested: true,
          },
          us_bank_account_ach_payments : {
           requested:true,
          },
         },
        } 
      }
    else {
      stripeData = {type: 'custom',
         country: 'US',
         email: hostData['email'],
         business_type: 'individual',
         tos_acceptance : {
            date : timestamp,
            ip : ip,
            service_agreement:'full',
         },
         capabilities: {
           card_payments: {
             requested: true,
           },
           transfers: {
             requested: true,
           },
           us_bank_account_ach_payments : {
             requested:true,
           },
        },
        business_profile: {
            mcc:'4789',
            url:'https://www.gridspot.co',
        },
        company : {
            name: hostData['firstName'] + " " + hostData['lastName'],
            tax_id: hostData['taxId'],
        },
        individual : {
           email: hostData['email'],
           first_name : hostData['firstName'],
           last_name : hostData['lastName'],
           ssn_last_4 : hostData['taxId'].slice(-4),
           id_number: hostData['taxId'],
           phone: hostData['phoneNumber'],
           dob : {
             day : hostData['dobDay'],
             month : hostData['dobMonth'],
             year : hostData['dobYear'],
           },
           address : {
             line1 : hostData['addr1'],
             line2 : hostData['addr2'],
             city : hostData['city'],
             state: hostData['state'],
             postal_code : hostData['zip'],
             country: 'US',
           },
        }
     }
   }
 
   const account = await stripe.accounts.create(stripeData);
   if(ownersNeeded){
     for(var i = 0; i < hostData['oemails'].length;i++){
       let owner = {
          email: hostData['oemails'][i],
          first_name : hostData['ofnames'][i],
          last_name : hostData['olnames'][i],
	  relationship: {
            owner : true,
          }
       }
       let p = await stripe.accounts.createPerson(account['id'],owner);
     }
     let q = await stripe.accounts.update(account['id'],{'company' : {'owners_provided':true}});
   }
   if(hostData['isCompany']){
     let representative = {
        email: hostData['remail'],
        first_name : hostData['rfirstName'],
        last_name : hostData['rlastName'],
        ssn_last_4 : hostData['rtaxId'].slice(-4),
        id_number: hostData['rtaxId'],
        phone: hostData['rphoneNumber'],
        relationship: {
          representative: true,
          title : hostData['rTitle'],
        },
        dob : {
          day : hostData['rdobDay'],
          month : hostData['rdobMonth'],
          year : hostData['rdobYear'],
        },
        address : {
          line1 : hostData['raddr1'],
          line2 : hostData['raddr2'],
          city : hostData['rcity'],
          state: hostData['rstate'],
          postal_code : hostData['rzip'],
          country: 'US',
        },
      };
     const person = await stripe.accounts.createPerson(account['id'],representative);
   }
   delete hostData['taxId']; 
   delete hostData['rtaxId']; 
   await addDocument('sHostData',hostData,uid);
   return account;
}

//hostData = {'stripeConnectedAccountId' : '', bankAccountToken : 'btok_...'}
const updateBankConnectedAccount = async(hostData) => {
   const account = await stripe.accounts.update(
      hostData['stripeConnectedAccountId'],
      {
        external_account: hostData['bankAccountToken'],
      }
    );
    return account;
}

const createPaymentIntent = async(paymentData) => {
   const paymentIntent = await stripe.paymentIntents.create({
     amount: paymentData['amount'],
     currency: paymentData['currency'],
     customer: paymentData['customer'],
     receipt_email: paymentData['email'],
     payment_method : paymentData['paymentMethodId'],
     description:"Electrical Vehicle Charging",
     automatic_payment_methods: {
     enabled: true,
     },
    });
    return paymentIntent;
 };

const getPaymentMethodInfo = async(paymentMethodId) => {
   const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
   return paymentMethod;
}

const createCustomer = async(customerData) => {
   const customer = await stripe.customers.create(customerData);
   return customer;
}

const createSetupIntent = async (custId) => {
   const setupIntent = await stripe.setupIntents.create({
     payment_method_types: ['card'],
     customer:custId,
    });
    return setupIntent;
}

const getSetupIntent = async (setupId) => {
   const setupIntent = await stripe.setupIntents.retrieve(setupId);
   return setupIntent;
}

const cancelSetupIntent = async(setupId) => {
   const setupIntent = await stripe.setupIntents.cancel(setupId)
   return setupIntent;
}

exports.payments = onRequest({ cors: true}, (req, res) => {
    const token = req.get('Authorization');
    const reqType = req.body.reqType;
    const ip = req.ip;

    if (!token) {
        return res.status(401).send('No token provided');
    }

    if (!reqType) {
        return res.status(400).send('No reqType provided');
    }

    admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            let resultPromise;
            if (reqType == 'createCustomer') {
                 const customerData = req.body.customerData; 
                 if (!customerData) 
                  return res.status(400).send('No customerData provided');
               resultPromise = createCustomer(customerData);
            }
            else if (reqType == 'createSI') {
                const customerId = req.body.customerId; 
                if (!customerId)
                  return res.status(400).send('No customerId provided');
                resultPromise = createSetupIntent(customerId);
            }
            else if (reqType == 'getSI') {
                const setupId = req.body.setupId; 
                if (!setupId)
                  return res.status(400).send('No setupId provided');
                resultPromise = getSetupIntent(setupId);
            }
            else if (reqType == 'deleteSI') {
                const setupId = req.body.setupId; 
                if (!setupId)
                  return res.status(400).send('No setupId provided');
                resultPromise = cancelSetupIntent(setupId);
            }
            else if (reqType == 'createConnectedAccount') {
                const hostData = req.body.hostData; 
                if (!hostData)
                  return res.status(400).send('No hostData provided');
                resultPromise = createConnectedAccount(decodedToken.uid,hostData,ip);
            }
            else if (reqType == 'updateBankConnectedAccount') {
                const hostData = req.body.hostData;
                if (!hostData)
                  return res.status(400).send('No hostData provided');
                resultPromise = updateBankConnectedAccount(hostData);
            }
            else if (reqType == 'createPayout') {
                const payoutData = req.body.payoutData;
                if (!payoutData)
                  return res.status(400).send('No payoutData provided');
                resultPromise = createPayout(decodedToken.uid,payoutData);
            }
           else if (reqType == 'getPaymentMethodInfo') {
                const paymentMethodId = req.body.paymentMethodId; 
                if (!paymentMethodId)
                  return res.status(400).send('No paymentMethodId provided');
                resultPromise = getPaymentMethodInfo(paymentMethodId);
            }
            else if (reqType == 'createPI') {
                const paymentData = req.body.paymentData; 
                if (!paymentData)
                  return res.status(400).send('No paymentData provided');
                resultPromise = createPaymentIntent(paymentData);
            }
            else {
                // Handle the case where reqType is not supported
                return Promise.reject(new Error('Invalid reqType'));
            }

            return resultPromise;
        })
        .then(result => {
            res.status(200).send(result);
        })
        .catch(error => {
            console.error(error);
            res.status(403).send('Unauthorized');
        });

});
 


