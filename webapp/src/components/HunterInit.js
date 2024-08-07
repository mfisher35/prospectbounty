import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import Logo  from '../assets/logofull.png';
import {lowerAll} from './Helpers';

const HunterInit = ({user, auth, db, storage, mobile, userData, setUserData}) => {
  const [contacts, setContacts] = useState([]);
  const [experience, setExperience] = useState("");

  
  const onSubmit = async () => {
    let lowerContacts = contacts.map(contact=>lowerAll(contact));
    let newUserData = userData; 
    newUserData['experience'] = experience;
    newUserData['closeContacts'] = lowerContacts;
    await setDoc(doc(db, "userData", user['uid']), newUserData);
    setUserData(newUserData);
  }

  return (
   <> <img src={Logo} width="500px"/>
    <div style={{padding:"30px 100px"}}>
      <center> 
       <h2> Bounty Hunter Set Up </h2> </center>
       <br/><br/>
       <div className="card">
          <h4> Please Give a Quick Description of Your Experience/Qualifications: </h4>
          <input type="text" size="80" onChange={e=>setExperience(e.target.value)}/> 
       </div>
       <div className="card">
         <h4> Please Add at Least 3 Decision Makers <br/> That You Have a Close Connection To: </h4><br/>
         <AddContactsWidget setContacts={setContacts} contacts={contacts}/> 
       </div> 
       <Button primary onClick={e=>onSubmit()}> Submit </Button>
    </div></>
  );
};

export default HunterInit;
