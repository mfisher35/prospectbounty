import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import {limit, where, updateDoc, doc, collection, query, orderBy, onSnapshot, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import {getYearMonth} from './Helpers';
import Logo  from '../assets/logofull.png';

const Chat = ({user, auth, db, storage, mobile, userData, type, userId1, userId2 }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sortedIds = [userId1, userId2].sort();
  const chatId = 'aaa';//`${sortedIds[0]}-${sortedIds[1]}`;

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

  const sendMessage = async () => {
    console.log(messages.length);
    if (message.trim()) {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        members : [user.uid,'test'],
        message,
        sender: user.uid,
        timestamp: serverTimestamp(),
      });
      setMessage('');
    }
  };

  return (
    <div>
      <div id="messages">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );

}
export default Chat;
