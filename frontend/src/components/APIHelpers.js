const restServer = "https://www.friendzone.best/rest"

//given a problem_description return all the dates and corrective actions for it
export async function signupAPI(data) {
  console.log('a');
  let url = `${restServer}/submit-form`
  //url+= "?n="+n.toString()
  //url+= "&acn="+acn.toString()

  return await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'x-access-token' : token,
      }
    }).then(res => res.json()).catch(function(error) {

       console.log('b');
       console.log(error.toString());
    }).then(res => { 
         console.log(res);
         return res
    });
}
