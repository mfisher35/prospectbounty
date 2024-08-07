import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import HunterInit from './HunterInit';
import styled from 'styled-components';
import BountyList from './BountyList';
import BountySearch from './BountySearch';
import Chat from './Chat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SearchIcon from '@mui/icons-material/Search';

const HunterHome = ({user, auth, db, storage, mobile, userData, setUserData}) => {
  const [screen, setScreen] = useState("bountylist");
  const [chatUID, setChatUID] = useState(null);
  const [chatName, setChatName] = useState(null);

  //start chat with uid, name
  const onChat = (uid,name)=> {
     setChatUID(uid);
     setChatName(name);
     setScreen('chat');
  }

  const cleanError = (error) => {
  }
  console.log('www',userData)

  return (
    <div style={{fontFamily:'Plus Jakarta Sans',fontSize:'12pt'}}>
       {userData['closeContacts'] && (<div className="sidebar" style={{width:mobile ? "100px" : "250px"}}>
      <center> <img src={mobile ? Logosm : Logo} width={mobile ? '50px' : '200px'}/> </center>
      <ul>
        <li onClick={e=>setScreen("bountylist")}>Bounty List</li>
        <li onClick={e=>setScreen("mybounties")}>My Bounties</li>
        <li onClick={e=>setScreen("search")}><SearchIcon style={{marginRight:'2px',fontSize:'15pt'}}/> Search</li>
        <li onClick={e=>setScreen("chat")}><ChatBubbleIcon style={{marginRight:'5px',fontSize:'13pt'}}/> Chat</li>
      </ul>
      <center>
        <div style={{color:'#ccc',fontSize:'8pt',marginTop:'60px'}}> 
           <PersonIcon fontSize="sm"/> {userData['username']} <br/> 
           {userData['role'].toUpperCase()}
        </div>

       </center>

    </div>)}
       <div style={{marginTop:'25px',marginLeft : mobile ? "100px" : "250px"}}>
         <center>  <img src={Logo} width={mobile ? "250px" : "500px"} /> 
           {(!userData['closeContacts'] && screen == "bountylist") && <HunterInit user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData}/>}
           {(userData['closeContacts'] && screen=="bountylist") && <BountyList key={'blist'+screen} user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} type={screen=="bountylist" ? 'all' : 'assignedToMe'} onChat={onChat}/>}
           {screen == "search" && <BountySearch user={user} db={db} auth={auth} userData={userData} setUserData={setUserData}/>}
           {screen == "chat" && <Chat user={user} auth={auth} db={db} userData={userData} userId2={chatUID} username2={chatName}/>}
         </center>
       </div></div> 
  );
};

export default HunterHome;
