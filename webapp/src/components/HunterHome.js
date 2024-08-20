import React, { useState } from 'react';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import HunterInit from './HunterInit';
import styled from 'styled-components';
import BountyList from './BountyList';
import BountySearch from './BountySearch';
import Chat from './Chat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import UserBar from './UserBar';

const HunterHome = ({user, auth, db, storage, mobile, userData, setUserData}) => {
  const [screen, setScreen] = useState("bountylist");
  const [chatUID, setChatUID] = useState(null);
  const [chatName, setChatName] = useState(null);
  const [hover, setHover] = useState(null);

  const iconStyle = {marginRight:'2px',fontSize:'15pt',marginBottom:'2px',color:'white'}

  //start chat with uid, name
  const onChat = (uid,name)=> {
     setChatUID(uid);
     setChatName(name);
     setScreen('chat');
  }

  const sbColor = (section) => {
    return section == screen ?
       {color:'#DFBB81',backgroundColor: "#1d2931"} : {backgroundColor : hover == section ? "#1d2931":"#021526",color:'white'}
  }

  const selectedItem = (section) => {
    if(section == screen)
      return <span style={{marginRight:'10px',textAlign:'left',backgroundColor:'#DFBB81',width: '6px',borderRadius: '12px 0px 0px 12px'}}> &nbsp; </span> 
    else return <span style={{marginRight:'10px',textAlign:'left',backgroundColor:'#021526',width: '6px',borderRadius: '12px 0px 0px 12px'}}> &nbsp; </span> 
  }

  const cleanError = (error) => {
  }

  return (
    <div style={{fontFamily:'General Sans',fontSize:'12pt',width:'100vw'}}>
       {userData['closeContacts'] && (<div className="sidebar" style={{width:mobile ? "100px" : "250px"}}>
      <center> <img src={mobile ? Logosm : Logo} width={mobile ? '50px' : '200px'}/> </center>
        <div style={{paddingBottom:'20px'}}> </div>
      <ul> 
        <div className="sbsection" style={sbColor("bountylist")} onMouseEnter={e=>setHover("bountylist")} onMouseLeave={e=>setHover(null)}>
           {selectedItem("bountylist")} 
           <li onClick={e=>setScreen("bountylist")}>  <AutoAwesomeMotionOutlinedIcon style={iconStyle}/>  Bounty List</li>
        </div>
        <div className="sbsection" style={sbColor("mybounties")} onMouseEnter={e=>setHover("mybounties")} onMouseLeave={e=>setHover(null)}> 
           {selectedItem("mybounties")}
           <li onClick={e=>setScreen("mybounties")}> <CoPresentOutlinedIcon style={iconStyle}/>  My Bounties</li>
        </div>
        <div className="sbsection" style={sbColor("search")} onMouseEnter={e=>setHover("search")} onMouseLeave={e=>setHover(null)}> 
           {selectedItem("search")}
           <li onClick={e=>setScreen("search")}><SearchIcon style={iconStyle}/>             Search</li>
        </div>
        <div className="sbsection" style={sbColor("chat")} onMouseEnter={e=>setHover("chat")} onMouseLeave={e=>setHover(null)}>
          {selectedItem("chat")}
          <li onClick={e=>setScreen("chat")}> <ChatOutlinedIcon style={iconStyle}/> Chat </li>
        </div>
      </ul>

    </div>)}
         <UserBar user={user} mobile={mobile} userData={userData} />
       <div style={{marginTop:'25px',marginLeft : mobile ? "100px" : "250px"}}>
         <center>   
           {(!userData['closeContacts'] && screen == "bountylist") && <HunterInit user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData}/>}
           {(userData['closeContacts'] && ["bountylist","mybounties"].indexOf(screen) >= 0) && <BountyList key={'blist'+screen} user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} type={screen=="bountylist" ? 'all' : 'assignedToMe'} onChat={onChat}/>}
           {screen == "search" && <BountySearch user={user} db={db} auth={auth} userData={userData} setUserData={setUserData} onChat={onChat}/>}
           {screen == "chat" && <Chat user={user} auth={auth} db={db} userData={userData} userId2={chatUID} username2={chatName}/>}
         </center>
       </div></div> 
  );
};

export default HunterHome;
