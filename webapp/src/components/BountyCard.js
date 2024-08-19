import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import {toTitleCase} from './Helpers';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import bountyImg from '../assets/bounty.png';

const BountyCard = ({user,userData,ix,bountyData,onManageBounty}) => {

  return (
  <div className="card" style={{cursor:user.uid == bountyData['posterId'] ? 'pointer' : 'default'}} onClick={e=>{if(user.uid == bountyData['posterId']) onManageBounty(bountyData);}} key={`bounty-${ix}`}>
   <img style={{marginBottom:'15px',borderRadius:'15px'}} src={bountyImg} height="200px"/> 
   {userData['role'] == 'poster' &&  <div style={{marginLeft:"0",textAlign:'right'}}><EditIcon style={{color:'#777'}} fontSize="sm"/> </div>}
       <div style={{display:'flex',flexDirection:'column'}}>    
          <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
              <div style={{flex:1}}>
                 <span style={{}}> {`${toTitleCase(bountyData['bountyName'])}`} </span> <br/>
           {` Reward: $${bountyData['amount']}`} 
              </div>
              <div style={{flex:1,textAlign:'right'}}>
        Organization <br/>
        kloop
              </div>
          </div>
          {bountyData['linkedin'] ? (<h6> <a href={bountyData['linkedin']}> LinkedIn Link </a> </h6>) : <></>}

          {bountyData['organization'] ? (<h6> <u> Organization</u>:  {toTitleCase(bountyData['organization'])} </h6>) : <></>}
          <h6> {`${bountyData['description']}`} </h6>
          {userData['role'] != "poster" && <div className="contact-button" onClick={e=>onChat(bountyList[ix]['posterId'],bountyList[ix]['posterUsername'])} > <ChatBubbleIcon style={{fontSize:'10pt',marginRight:'5px',color:'#607bd1'}}/> Contact </div>   }
      </div>
       </div>)
};

export default BountyCard;
