import React, { useState, useEffect } from 'react';
import { where, query, doc, getDocs, getDoc, collection, setDoc, addDoc, getFirestore } from "firebase/firestore";
import Button from 'react-bootstrap/Button'
import {createSetupIntentAPI} from './APIHelpers';

const AddCardWidget = ({user, auth, db, userData, setUserData, bounties, setBounties, mobile, setAddingCard, stripe}) => {

  const [setupIntent, setSetupIntent] = useState(null);

  useEffect(() => {
   createSetupIntentAPI(user,userData['custId']).then(result=>{
      setSetupIntent(result);
      const appearance = {
          theme: 'stripe',
      };
      const elements = stripe.elements({appearance, clientSecret: result['client_secret']});
      const paymentElement = elements.create('payment');
      paymentElement.mount('#payment-element');
   })
   }
  , [user]);


  const addCreditCard = () => {
   
  }


  return (
  <div className="cardcontainer">
     <form id="payment-form">
       <div id="payment-element">
       </div> <br/>
       <Button onClick={e=>addCreditCard()} variant="primary">Submit</Button>
       <div id="error-message">
       </div>
     </form>
   </div>
)
};

export default AddCardWidget;
