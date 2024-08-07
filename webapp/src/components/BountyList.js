import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import {collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; 
import Logo  from '../assets/logofull.png';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EditIcon from '@mui/icons-material/Edit';
import {toTitleCase} from './Helpers';

const BountyList = ({user, auth, db, storage, mobile, userData, type, onChat, onManageBounty}) => {
   const [bountyList, setBountyList] = useState([]);

   useEffect(() => {
   let myList = []
   console.log(type);
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
    <div style={{padding:"30px 100px"}}>  
      <center> 
       <h2> {type == "all" ? "All Bounties" : "My Bounties"} </h2> </center>
       <br/>
       {bountyList.map((item,ix)=><div className="card" style={{cursor:user.uid == item['posterId'] ? 'pointer' : 'default'}} onClick={e=>{if(user.uid == item['posterId']) onManageBounty(item);}} key={`bounty-${ix}`}>
          <div style={{marginLeft:"0",textAlign:'right'}}><EditIcon style={{color:'#777'}} fontSize="sm"/> </div>
          <h4> {` ${ix+1}) ${toTitleCase(item['bountyName'])}`} </h4>

          {item['linkedin'] ? (<h6> <a href={item['linkedin']}> LinkedIn Link </a> </h6>) : <></>}
          <h5> {` Reward: $${item['amount']}`} </h5>

          {item['organization'] ? (<h6> <u> Organization</u>:  {toTitleCase(item['organization'])} </h6>) : <></>}
          <h6> {`${item['description']}`} </h6>
          {userData['role'] != "poster" && <div className="contact-button" onClick={e=>onChat(bountyList[ix]['posterId'],bountyList[ix]['posterUsername'])} > <ChatBubbleIcon style={{fontSize:'10pt',marginRight:'5px',color:'#607bd1'}}/> Contact </div>   }
       </div>)}
    </div>
  );
};

export default BountyList;
