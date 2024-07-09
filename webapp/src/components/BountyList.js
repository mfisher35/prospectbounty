import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import {collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; 
import Logo  from '../assets/logofull.png';

const BountyList = ({user, auth, db, storage, mobile, userData}) => {
   const [bountyList, setBountyList] = useState([]);

   useEffect(() => {
   let myList = []
   getDocs(collection(db, "bountyList")).then((querySnapshot)=>{
     querySnapshot.forEach((doc)=>{
       let docData = doc.data();
       if(docData['id'] != 0)
         myList.push(docData);
     })
    setBountyList(myList);
   })
  }, []);


  const onSubmit = async () => {
    console.log(bountyList);
  }

  return (
   <div style={{marginLeft: mobile ? "100px" : "250px"}}> <img src={Logo} width="500px"/>
    <div style={{padding:"30px 100px"}}>
      <center> 
       <h2> Bounty Hunter Set Up </h2> </center>
       <br/><br/>
       <div className="card" onClick={e=>onSubmit()}>
          <h4> Example Bounty 1 </h4>
       </div>
    </div>
   </div>
  );
};

export default BountyList;
