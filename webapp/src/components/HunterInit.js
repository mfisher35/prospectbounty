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
   <div style={{marginTop:'40px'}}> <center> <img src={Logo} width="500px"/> </center>
    <div style={{padding:"30px 100px"}}>
      <center> 
       <h2> Bounty Hunter Set Up </h2> </center>
       <br/><br/>
       <div style={{borderRadius:'15px',backgroundColor:'white',padding:'20px'}}>
          <div style={{textAlign:'left',color:'blue',marginBottom:'15px'}}> <h7> <b> Optional </b> </h7> </div>
          <span style={{fontSize:'13pt',fontWeight:'bold'}}> Please Give a Quick Description of Your Experience/Qualifications: </span><br/>
          <input type="text" size="80" onChange={e=>setExperience(e.target.value)}/> 
       </div>
       <br/><br/>
       <div style={{borderRadius:'15px',backgroundColor:'white',padding:'20px'}}>
          <div style={{textAlign:'left',color:'blue',marginBottom:'15px'}}> <h7> <b> Optional </b> </h7> </div>
         <span style={{fontSize:'13pt',fontWeight:'bold'}}> Please Add at Least 3 Decision Makers You Have a Close Connection To: </span><br/><br/>
         <div style={{width:'100%',textAlign:'left'}}>
           <AddContactsWidget setContacts={setContacts} contacts={contacts}/> 
         </div>
       </div> 
       <div style={{width:'100%',textAlign:'right',marginTop:'18px'}}>
         <Button className='bounty-assign-btn' style={{padding:'16px',fontWeight:'bold'}} primary onClick={e=>onSubmit()}> Submit </Button>
       </div>
    </div></div>
  );
};

export default HunterInit;
