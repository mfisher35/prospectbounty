import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";

const HunterInit = ({user, auth, db, storage, mobile, userData, setUserData}) => {
  const [contacts, setContacts] = useState([]);
  const [experience, setExperience] = useState("");

  
  const onSubmit = () => {
    let newUserData = userData; 
    newUserData['experience'] = experience;
    newUserData['closeContacts'] = contacts;
    setUserData(newUserData);
  }

  return (
    <div style={{marginLeft:mobile ? "100px" : "250px",marginTop:'40px', padding:"30px 60px"}}>
      <center> <h1> Bounty Hunter Set Up </h1> </center>
       <br/><br/>
       <div className="card">
          <h4> Please Give a Quick Description of Your Experience/Qualifications: </h4>
          <input type="text" size="80" onChange={e=>setExperience(e.target.value)}/> 
       </div>
       <div className="card">
         <h4> Please Give Add at Least 3 Decision Makers <br/> That You Have a Close Connection To: </h4><br/>
         <AddContactsWidget setContacts={setContacts} contacts={contacts}/> 
       </div> 
       <Button primary onClick={e=>onSubmit()}> Submit </Button>
    </div>
  );
};

export default HunterInit;
