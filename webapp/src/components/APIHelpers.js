const restServer = "https://payments-zjssq4bgza-uc.a.run.app"

//create a stripe customer object with the given customer data {name,email}
export async function createCustomerAPI(user,customerData) {
  let token = await user.getIdToken();
  let url = `${restServer}`
  let data = {'reqType': 'createCustomer', 'customerData':customerData};

  return await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token,
      }
    }).then(res => res.json()).catch(function(error) {

       console.log(error.toString());
    }).then(res => { 
         console.log(res);
         return res
    });
}

//create a stripe payment intent for making a credit card payment, paymentData = {amount*100, currency, customer, email, paymentMethodId}
export async function createPaymentIntentAPI(user,paymentData) {
  let token = await user.getIdToken();
  let url = `${restServer}`
  let data = {'reqType': 'createPI', paymentData};

  return await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token,
      }
    }).then(res => res.json()).catch(function(error) {

       console.log(error.toString());
    }).then(res => { 
         console.log(res);
         return res
    });
}

//get setup intent data that belongs to the appropriate setupId
export async function getSetupIntentAPI(user,setupId) {
  let token = await user.getIdToken();
  let url = `${restServer}`
  let data = {'reqType': 'getSI', 'setupId':setupId};

  return await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token,
      }
    }).then(res => res.json()).catch(function(error) {

       console.log(error.toString());
    }).then(res => { 
         console.log(res);
         return res
    });
}

//create a stripe setup intent for adding a new credit card with given customerId 
export async function createSetupIntentAPI(user,custId) {
  let token = await user.getIdToken();
  let url = `${restServer}`
  let data = {'reqType': 'createSI', 'customerId':custId};

  return await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token,
      }
    }).then(res => res.json()).catch(function(error) {

       console.log(error.toString());
    }).then(res => { 
         console.log(res);
         return res
    });
}


//create a bountyData Object in the bounty list collection {amount, bountyName, description, company, email, fname, lname, linkedin, oistDate, posterId, posterName, paymentData} 
export async function createBountyAPI(user,bountyData) {
  let token = await user.getIdToken();
  let url = `${restServer}`
  let data = {'reqType': 'createBounty', bountyData};

  return await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token,
      }
    }).then(res => res.json()).catch(function(error) {

       console.log(error.toString());
    }).then(res => { 
         console.log(res);
         return res
    });
}


