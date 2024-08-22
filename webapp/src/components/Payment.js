import React, { useState, useEffect } from 'react';
import { where, query, doc, getDocs, getDoc, collection, setDoc, addDoc, getFirestore } from "firebase/firestore";
import Button from 'react-bootstrap/Button'
import {createPaymentIntentAPI} from './APIHelpers';
import {splitStyle} from './Helpers';
import Spinner from 'react-bootstrap/Spinner';

const Payment = ({user, auth, db, userData, setUserData, bounties, setBounties, mobile, setAddingCard, stripe, onPaymentSuccess, onPaymentFail}) => {

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stripeElements, setStripeElements] = useState(null);
  const [paymentData, setPaymentData] = useState({});
  const [amount, setAmount] = useState("");
  const [amountFinished, setAmountFinished] = useState(false);
  const [paying, setPaying] = useState(false);

  const onSetupPayment = () => {
   setLoading(true);
   //console.log('userData',userData);
   createPaymentIntentAPI(user,{currency: 'USD', methods:['card'], customer: userData['custId'], email: user.email,amount:parseInt(parseFloat(amount)*100)}).then(result=>{
      setPaymentIntent(result);
      const appearance = {
          theme: 'stripe',
      };
      const elements = stripe.elements({appearance, clientSecret: result['client_secret'] /*, mode:'setup'*/});
      const paymentElement = elements.create('payment',{paymentMethodOrder: ['card']});
      paymentElement.mount('#payment-element');
      setStripeElements(elements);
      setLoading(false);
      setAmountFinished(true);
   });
  }


  const submitPayment = async () => {
     setPaying(true);
     try{
        //let result = await stripeElements.submit()
        let result = await stripe.confirmPayment({
          elements:stripeElements,
          redirect: 'if_required'
        });
        
        //console.log('paymentresult',result['paymentIntent']);
        setPaymentIntent(result['paymentIntent']);
        onPaymentSuccess(result['paymentIntent']);
        
             
     }catch(e){console.log(e); onPaymentFail(e.toString());}
     setPaying(false);
  }


  return (
  <div className="cardcontainer">
     {loading &&  <> <center> <Spinner variant="primary"/> </center></>}
     {(!amountFinished && !loading) && <div> 
       <div style={{display:'flex',flexDirection:'column',textAlign:'left',fontWeight:'bold'}}>
           Bounty Amount
           <div style={{display:'block'}}> $ <input  type="text" placeholder="Bounty Amount" type="text" value={amount} onChange={e=>setAmount(e.target.value)}/> <center> <button className="bounty-btn" style={{marginTop:'15px'}}  onClick={e=>onSetupPayment()}> Continue To Payment </button> </center> <br/> </div> </div>
       </div>
    }
     {amountFinished &&  <center> <h3> {`$${amount}`} </h3></center>}
     <form id="payment-form">
       <div id="payment-element">
       </div> <br/>
       {(amountFinished && !paying) && <Button onClick={e=>submitPayment()} className="bounty-btn">Submit Payment</Button>}
       {(amountFinished && paying) && <Spinner variant="primary"/>}
       <div id="error-message">
       </div>
     </form>
   </div>
)
};

export default Payment;
