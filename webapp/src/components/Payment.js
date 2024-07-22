import React, { useState, useEffect } from 'react';
import { where, query, doc, getDocs, getDoc, collection, setDoc, addDoc, getFirestore } from "firebase/firestore";
import Button from 'react-bootstrap/Button'
import {createPaymentIntentAPI} from './APIHelpers';
import Spinner from 'react-bootstrap/Spinner';

const Payment = ({user, auth, db, userData, setUserData, bounties, setBounties, mobile, setAddingCard, stripe, onPaymentSuccess, onPaymentFail}) => {

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stripeElements, setStripeElements] = useState(null);
  const [paymentData, setPaymentData] = useState({});
  const [amount, setAmount] = useState("");
  const [amountFinished, setAmountFinished] = useState(false);

  const onSetupPayment = () => {
   console.log('userData',userData);
   createPaymentIntentAPI(user,userData['custId']).then(result=>{
      setPaymentIntent(result);
      const appearance = {
          theme: 'stripe',
      };
      const elements = stripe.elements({appearance, clientSecret: result['client_secret'] /*, mode:'setup'*/});
      const paymentElement = elements.create('payment');
      paymentElement.mount('#payment-element');
      setStripeElements(elements);
      setLoading(false);
   });
  }


  const submitPayment = async () => {
     try{
        let result = await stripeElements.submit()
        let confirmedSI = await getSetupIntentAPI(user,setupIntent['id']);
        console.log(confirmedSI);
        onPaymentSuccess();
             
     }catch(e){console.log(e); onPaymentFail(e.toString());}
  }


  return (
  <div>
     {loading ? <> <center> <Spinner variant="primary"/> </center></> :
     <> $ <input type="text" placeholder="Bounty Amount" type="text" value={amount} onChange={e=>setAmount(e.target.value)}/><span style={{marginRight:'10px'}}/> <br/> </>}

     <form id="payment-form">
       <div id="payment-element">
       </div> <br/>
       {amountFinished && <Button onClick={e=>submitPayment()} variant="primary">Submit Payment</Button>}
       <div id="error-message">
       </div>
     </form>
   </div>
)
};

export default Payment;
