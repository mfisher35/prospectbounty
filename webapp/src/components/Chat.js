import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import {limit, where, updateDoc, doc, collection, query, orderBy, onSnapshot, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import {getYearMonth} from './Helpers';
import Logo  from '../assets/logofull.png';
import SendIcon from '@mui/icons-material/Send';
import UserBountyAssignmentWidget from './UserBountyAssignmentWidget';

const Chat = ({user, auth, db, storage, mobile, userData, userId2, userName2}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sortedIds = [user.uid, userId2].sort();
  const chatId = `${sortedIds[0]}-${sortedIds[1]}`;

  useEffect(() => {
    console.log(chatId,user.uid);
    const q = query(
      collection(db, 'chats', chatId, 'messages'),where("members", "array-contains", user.uid), orderBy('timestamp','desc'),limit(20)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => doc.data()).reverse();
      console.log(messages);
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [chatId]);

    const convertTimestamp = (timestamp)=> {
     if(!timestamp)
       return "";
     let dateLocal = timestamp.toDate();
     let newDate = new Date(
      dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
    );
     return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(dateLocal)
    }

  const sendMessage = async () => {
    console.log(messages.length);
    if (message.trim()) {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        members : [user.uid,'test'],
        message,
        sender: user.uid,
        senderName: userData['name'],
        receiver: userId2,
        receiverName: userName2,
        timestamp: serverTimestamp(),
      });
      setMessage('');
    }
  };

  return ( <div style={{marginTop:'15px'}}>
    <UserBountyAssignmentWidget/>
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
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button class="chatbutton" onClick={sendMessage}> <SendIcon style={{fontSize:'13pt',marginBottom:'2px'}}/> Send</button>
      </div>
    </div>
   </div>
  );

}
export default Chat;
