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
          <div style={{display:'flex',flexDirection:'row',width:'100%',marginBottom:'12px'}}>
              <div style={{flex:1}}>
                 <span style={{fontSize:'14pt',fontWeight:'600'}}> 
                    {`${toTitleCase(bountyData['bountyName'])}`}
                 </span> <br/>
                <span style={{fontSize:'11pt'}}>           
                    {`Reward: $${bountyData['amount']}`} 
                </span>
              </div>
              <div style={{flex:1,textAlign:'right'}}>
                <span style={{color:'#ccc'}}>
                    ORGANIZATION 
                </span> <br/>
                <span>
                    {bountyData['organization'] ? toTitleCase(bountyData['organization']) : "N/A"}
                </span>
              </div>
          </div>
          {bountyData['linkedin'] ? (<h6> <a href={bountyData['linkedin']}> LinkedIn</a> </h6>) : <></>}
          {`${bountyData['targetDescr'] ?? ""}`}<div style={{height:'10px'}}/>
          <span style={{fontWeight:600}}> OFFERING: </span>  {`${bountyData['description']}`} {`${ix == 1 ? "dfsjhfdjkfdhsjkahfjkfsdhjkdahfjkhdfsajkdfhsajkfbhdsjakfbdjksahfjkdsahfjkdsahfjkasdhfjkfdshjkdshjkfhasdjkfhjkdshfjkdashkjfhjksdbchbchjcbhcbhjs" : ""}`} 
          {userData['role'] != "poster" && 

           <div className="contact-button" onClick={e=>onChat(bountyList[ix]['posterId'],bountyList[ix]['posterUsername'])} >  CONTACT </div>   
        }
      </div>
       </div>)
};

export default BountyCard;
