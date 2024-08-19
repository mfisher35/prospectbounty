import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import {collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; 
import Logo  from '../assets/logofull.png';
import {toTitleCase} from './Helpers';
import BountyCard from './BountyCard';

const BountyList = ({user, auth, db, storage, mobile, userData, type, onChat, onManageBounty,bounties}) => {
   const [bountyList, setBountyList] = useState(bounties ?? []);

   useEffect(() => {
   let myList = []
   console.log(type);
   if(!bounties)
     getDocs(collection(db, "bountyList")).then((querySnapshot)=>{
     querySnapshot.forEach((doc)=>{
       let docData = doc.data();
       docData['id'] = doc.id;
       if(docData['id'] != 0)
        if( (userData['role'] == 'hunter' || (docData['posterId'] == user['uid'])))
         if(type == "all" || (type=="assignedToMe" && docData['hunterId']==user['uid']) || (docData['posterId'] == user['uid']))
           myList.push(docData);
     })
    myList.sort((a,b) => a > b);
    setBountyList(myList);
   })
  }, []);


  const onSubmit = async () => {
    console.log(bountyList);
  }

  return (
   <>
    <div style={{padding:"10px 30px",textAlign:'left'}}>  
       <div style={{fontSize:'30px',fontWeight:'600'}}> {type == "all" ? "All Bounties" : "Bounties"} </div> 
       <div style={{display:'flex'}}>
         {bountyList.map((item,ix)=><BountyCard user={user} userData={userData} bountyData={item} ix={ix} onManageBounty={onManageBounty} onChat={onChat}/>)}
      </div>
    </div>
  </>
  );
};

export default BountyList;
