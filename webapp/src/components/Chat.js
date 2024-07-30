import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import {getDocs, limit, where, updateDoc, doc, collection, query, orderBy, onSnapshot, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import {getYearMonth} from './Helpers';
import Logo  from '../assets/logofull.png';
import SendIcon from '@mui/icons-material/Send';
import UserBountyAssignmentWidget from './UserBountyAssignmentWidget';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Chat = ({user, auth, db, storage, mobile, userData, userId2, username2}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [otherId, setOtherId] = useState(null);
  const [otherUsername, setOtherUsername] = useState(null);
 
  //get all messages incoming
  const startSubscribe = () => {
     const q = query(
        collection(db, 'messages'),where("members", "array-contains", user.uid),orderBy('timestamp','desc'),limit(500)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log('snaps',snapshot);
        let messages = snapshot.docs.map(doc => doc.data()).reverse();
        if(otherId || userId2)
          messages = messages.filter(msg=>getOtherId(msg)== (otherId ?? userId2));
        console.log('SETTING MESSGES',messages);
        console.log('OTHERID',otherId ?? userId2);  
        setMessages(messages);
      });

      return () => unsubscribe();
  }

  useEffect(() => {
      if(userId2 && username2){
        setOtherId(userId2);
        setOtherUsername(username2);
        console.log(userId2,username2);
      }
      startSubscribe(); 
  }, []);

    const convertTimestamp = (timestamp)=> {
     if(!timestamp)
       return "";
     let dateLocal = timestamp.toDate();
     let newDate = new Date(
      dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
    );
     return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(dateLocal)
    }

  const onBack = () => { 
   setOtherUsername(null);
   setOtherId(null);
  }

  const getOtherUsername = (msg) => {
    return  msg['sender'] == user.uid ? msg['receiverUsername'] : msg['senderUsername'];
  }

  const getOtherId = (msg) => {
    console.log('ppp',msg,otherId);
    return  msg['sender'] == user.uid ? msg['receiver'] : msg['sender'];
  }


  const getChatSessions = () => {
   let sessions = [];
   let rmessages = [...messages];
   rmessages.reverse();


   for(let i = 0; i < rmessages.length; i++){
        let otherUsername = getOtherUsername(rmessages[i]);
        let otherId = getOtherId(rmessages[i]);
        if(sessions.filter(msg=>msg['otherUsername'] == otherUsername).length < 1)
           sessions.push({otherUsername,otherId, ... rmessages[i]});
     }
   console.log('allsessions',sessions);
   return sessions.map(msg=>
    <div style={{border:'1px solid #ccc',borderRadius:'10px',padding:'10px',paddingRight:'50px',maxWidth:'600px',paddingLeft:'20px',width:'fit-content',display:'flex',backgroundColor:'white',cursor:'pointer'}} onClick={e=>{setOtherId(msg['otherId']);setOtherUsername(msg['otherUsername']);console.log('ssasasa',msg['otherUsername'],msg)}} >
      <div style={{marginRight:'20px',borderRadius:'20px',border:'1px solid #ccc',marginTop:'5px',height:'fit-content',padding:'3px',backgroundColor:'white',alignItems:'center'}}>
        <PersonIcon/>      
      </div>
      <div style={{display:'flex',flexDirection:'column',padding:'2px',margin:'5px',width:'auto'}}> 
         <span style={{fontSize:'16pt'}}> {msg['otherUsername']} </span> 
         <span style={{fontSize:'13pt',color:'#bbb'}}>  {msg['message']} </span>
      </div>
    </div>);
  }

  const sendMessage = async () => {
    console.log(messages.length);
    
    let doc = {
      
          message,
          sender: user.uid,
          senderUsername: userData['username'],
          members:[user.uid,otherId],
          receiver: otherId,
          receiverUsername: otherUsername,
          timestamp: serverTimestamp(),
        };
       
    console.log('adding doc',doc)
    if (message.trim()) {
      await addDoc(collection(db,'messages'),doc);
       }
      setMessage('');
    }
  

  return ( <div style={{marginTop:'15px'}}>

   {otherId  ? <div style={{display:'flex',flexDirection:'column'}}> <div onClick={e=>onBack()}> <ArrowBackIcon/> </div> 
        <div> <UserBountyAssignmentWidget/></div>
       <div className="chat-container" style={{marginTop:'10px'}}>
       
      <div id="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p style={{'marginBottom':'15px'}}>
              <span style={{fontSize:'9pt'}}><b> {msg.sender == user.uid ? "Me  " : "Them  "}</b></span>
              <span style={{fontSize:'8pt',fontColor:'#727479',marginLeft:'10px'}}> {convertTimestamp(msg.timestamp)}<br/></span>
               {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input 
          className="chatinput"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button class="chatbutton" onClick={sendMessage}> <SendIcon style={{fontSize:'13pt',marginBottom:'2px'}}/> Send</button>
      </div>
    </div></div> : 
       <div style={{marginTop:'20px'}}> 
         {getChatSessions()}
       </div>
   }

   </div>
  );

}
export default Chat;
