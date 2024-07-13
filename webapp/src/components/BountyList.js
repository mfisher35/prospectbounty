import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import {collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; 
import Logo  from '../assets/logofull.png';

const BountyList = ({user, auth, db, storage, mobile, userData, type}) => {
   const [bountyList, setBountyList] = useState([]);

   useEffect(() => {
   let myList = []
   console.log(type);
   getDocs(collection(db, "bountyList")).then((querySnapshot)=>{
     querySnapshot.forEach((doc)=>{
       let docData = doc.data();
       if(docData['id'] != 0)
        if( (userData['role'] == 'hunter' || (docData['posterId'] == user['uid'])))
         if(type == "all" || (type=="assignedToMe" && docData['hunterId']==user['uid']) || (docData['posterId'] == user['uid']))
           myList.push(docData);
     })
    setBountyList(myList);
   })
  }, []);


  const onSubmit = async () => {
    console.log(bountyList);
  }

  return (
    <div style={{padding:"30px 100px"}}>
      <center> 
       <h2> Bounty List ({type == "all" ? "All" : "My Bounties"}) </h2> </center>
       <br/><br/>
       {bountyList.map((item,ix)=><div className="card" key={`bounty-${ix}`} onClick={e=>onSubmit()}>
          <h4> {` ${ix+1}) ${item['bountyName']}`} </h4>
          <h5> {` Reward: $${item['amount']}`} </h5>
          <h6> {`$${item['description']}`} </h6>
       </div>)}
    </div>
  );
};

export default BountyList;
