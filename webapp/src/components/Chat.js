import React, { useState, useRef, useEffect } from 'react';
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
import Spinner from 'react-bootstrap/Spinner';
import {messageReceivedAPI} from './APIHelpers';

const Chat = ({user, auth, db, storage, mobile, userData, userId2, username2}) => {
  const chatContainerRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [otherId, setOtherId] = useState(userId2);
  const [otherUsername, setOtherUsername] = useState(username2);
  const [sending, setSending] = useState(false);
  const [managingUser, setManagingUser] = useState(false);
  
  //get all messages incoming
  const startSubscribe = () => {
     const q = query(
        collection(db, 'messages'),where("members", "array-contains", user.uid),orderBy('timestamp','desc'),limit(500)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let messages = snapshot.docs.map(doc => doc.data()).reverse();
        if(otherId || userId2)
          messages = messages.filter(msg=>getOtherId(msg)== (otherId ?? userId2));
        setMessages(messages);
      });

      return () => unsubscribe();
  }

  useEffect(() => {
      startSubscribe(); 
  }, []);

   useEffect(() => {
    console.log('0909090',chatContainerRef.current);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [otherId,messages]);

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
   if(managingUser){
     setManagingUser(false)
   }
   else {
      setOtherUsername(null);
      setOtherId(null);
   }
  }

  const getOtherUsername = (msg) => {
    return  msg['sender'] == user.uid ? msg['receiverUsername'] : msg['senderUsername'];
  }

  const getOtherId = (msg) => {
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
   if(sessions.length == 0)
     return <div> No Messages! </div>
   return  sessions.map(msg=>
    <div style={{marginBottom:'15px',border:'2px solid #ccc',borderRadius:'10px',padding:'10px',width:'500px',padding:'20px',margin:'20px',display:'flex',backgroundColor:'white',cursor:'pointer'}} onClick={e=>{setOtherId(msg['otherId']);setOtherUsername(msg['otherUsername'])}} >
      <div style={{marginRight:'20px',borderRadius:'20px',border:'1px solid #ccc',marginTop:'0px',height:'fit-content',padding:'3px',backgroundColor:'white',alignItems:'center'}}>
        <PersonIcon style={{marginTop:'-5px'}}/>      
      </div> 
         <span style={{fontSize:'16pt'}}> {msg['otherUsername']} </span> <br/>
      <div style={{marginTop:'40px',width:'auto'}}> 
            <span style={{fontSize:'13pt',color:'#bbb'}}>  {msg['message']} </span>
      </div>
    </div>);
  }

  const sendMessage = async () => {
    setSending(true); 
    let doc = {
      
          message,
          sender: user.uid,
          senderUsername: userData['username'],
          members:[user.uid,otherId],
          receiver: otherId,
          receiverUsername: otherUsername,
          timestamp: serverTimestamp(),
        };
       
    if (message.trim()) {
      await addDoc(collection(db,'messages'),doc);
       }
      await messageReceivedAPI(user,doc);
      setMessage('');
   setSending(false);
    }
  

  return ( <div style={{marginTop:'35px',padding:'10px 30px',textAlign:'left'}}>
   {!otherId &&  <span style={{fontSize:'30px',fontWeight:'600'}}> Messages </span>} 
   {otherId  ? <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{textAlign:'left',width:'100%'}}>
           <div style={{textAlign:'left',width:'fit-content',backgroundColor:'#ddd',borderRadius:'20px',border:'1px solid #ccc'}} onClick={e=>onBack()}> <ArrowBackIcon/> 
           </div>
        <div style={{fontSize:'30px',fontWeight:'600'}}>  {`Chat with ${otherUsername}`} </div>
        {userData['role'] == 'poster' && 
          <div>
             <UserBountyAssignmentWidget user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} otherId={otherId} otherUsername={otherUsername} setManagingUser={setManagingUser} managingUser={managingUser}/>
          </div>
        }
        </div> 
   { !managingUser &&  <div className="chat-container" style={{marginTop:'10px'}}>
       
      <div id="messages" ref={chatContainerRef}>
        {messages.filter((m,i) => getOtherId(m)==otherId).map((msg, index) => (
          <div key={index}>
           <div className={msg.sender == user.uid ? "headerSent" : "headerReceived"}>
              <span style={{fontSize:'9pt'}}><b> {msg.sender == user.uid ? "Me  " : msg.senderUsername}</b></span>
              <span style={{fontSize:'8pt',color:'#868fa8',marginLeft:'10px'}}> {convertTimestamp(msg.timestamp)}<br/></span></div>
            <div className={msg.sender == user.uid ? "messageSent" : "messageReceived"}>              {msg.message} </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input 
          className="chatinput"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>{if(e.key == "Enter") sendMessage()}}
          placeholder="Type a message"
        />
        {sending ? <div style={{textAlign:'center',paddingTop:'14px',paddingRight:'30px'}}> <Spinner style={{color:'#dfbb81'}}/> </div> : <button class="chatbutton" onClick={sendMessage}> <SendIcon style={{fontSize:'13pt',marginBottom:'2px'}}/> Send</button>}
      </div>
    </div>}</div> : 
       <div style={{marginTop:'20px'}}> 
         <center> {getChatSessions()} </center>
       </div>
   }

   </div>
 );

}
export default Chat;
