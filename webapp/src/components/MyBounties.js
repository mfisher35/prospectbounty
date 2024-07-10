import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import Logo  from '../assets/logofull.png';

const MyBounties = ({user, auth, db, storage, mobile, userData}) => {
  //const [experience, setExperience] = useState("");

  
  const onSubmit = async () => {
  }

  return (
    <div style={{padding:"30px 100px"}}>
      <center> 
       <h2> My Bounties </h2> </center>
       <br/><br/>
       <div className="card">
          <h4> Example Bounty 1 </h4>
       </div>
    </div>
  );
};

export default MyBounties;
