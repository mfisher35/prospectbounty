const paymentRestServer = "https://payments-zjssq4bgza-uc.a.run.app";
const manageBountyRestServer = "https://managebounties-zjssq4bgza-uc.a.run.app";
const notificationsRestServer = "https://notifications-zjssq4bgza-uc.a.run.app";

//create a stripe customer object with the given customer data {name,email}
export async function createCustomerAPI(user,customerData) {
  let token = await user.getIdToken();
  let url = `${paymentRestServer}`
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
  let url = `${paymentRestServer}`
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
  let url = `${paymentRestServer}`
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
  let url = `${paymentRestServer}`
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


//create a bountyData Object in the bounty list collection {amount, bountyName, description, organization, email, fname, lname, linkedin, oistDate, posterId, posterUsername, paymentData} 
export async function createBountyAPI(user,bountyData) {
  let token = await user.getIdToken();
  let url = `${paymentRestServer}`
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

//username check availability
export async function usernameAvailableAPI(username) {
  let url = `${manageBountyRestServer}`
  let data = {'reqType': 'usernameAvailable', username};

  return await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json()).catch(function(error) {

       console.log(error.toString());
    }).then(res => { 
         return res['result'];
    });
}


//create a bountyData Object in the bounty list collection {amount, bountyName, description, organization, email, fname, lname, linkedin, oistDate, posterId, posterUsername, paymentData} 
export async function modifyBountyAPI(user,bountyData) {
  let token = await user.getIdToken();
  let url = `${manageBountyRestServer}`
  let data = {'reqType': 'modifyBounty', bountyData};

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
         return res
    });
}


//create a bountyData Object in the bounty list collection {amount, bountyName, description, organization, email, fname, lname, linkedin, oistDate, posterId, posterUsername, paymentData} 
export async function deleteBountyAPI(user,bountyData) {
  let token = await user.getIdToken();
  let url = `${manageBountyRestServer}`
  let data = {'reqType': 'deleteBounty', bountyData};

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

//notify a user of a new message messageData needs {receiver, message} 
export async function messageReceivedAPI(user,messageData) {

  let token = await user.getIdToken();
  let url = `${notificationsRestServer}`
  let data = {'reqType': 'messageReceived', messageData};

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


