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



