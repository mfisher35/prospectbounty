import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import styled from 'styled-components';
import PosterBounties from './PosterBounties';
import { collection, query, where, getDocs } from "firebase/firestore";
import BountyList from './BountyList';
import Chat from './Chat';
import FeedIcon from '@mui/icons-material/Feed';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const PosterHome = ({user, auth, db, storage, mobile, userData, setUserData, stripe}) => {
  //const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState("bounties");
  const [myBounties, setMyBounties] = useState(null);

  const cleanError = (error) => {
  }

   useEffect(() => {
   let myList = []
   const q = query(collection(db, "bountyList"), where("posterId", "==", user.uid));

   getDocs(q).then((querySnapshot)=>{
     querySnapshot.forEach((doc)=>{
       let docData = doc.data();
         myList.push(docData);
     })
    setMyBounties(myList);
   })
  }, []);

  return (
    <div style={{fontFamily:'Plus Jakarta Sans',fontSize:'12pt'}}>
       <div className="sidebar" style={{width:mobile ? "100px" : "250px"}}>
      <center> 
        <img src={mobile ? Logosm : Logo} width={mobile ? '50px' : '200px'} /> 
     </center>
      <ul>
        <li onClick={async (e)=>{await setScreen("chat");setScreen("bounties");}}> <FeedIcon style={{marginRight:'2px',fontSize:'15pt'}}/> My Bounties</li>
        <li onClick={async (e)=>{await setScreen("bounties"); setScreen("chat")}}><ChatBubbleIcon style={{marginRight:'5px',fontSize:'13pt'}}/> Chat</li>
      </ul>
      <center>
        <div style={{color:'#ccc',fontSize:'8pt',marginTop:'60px'}}> 
           <PersonIcon fontSize="sm"/> {userData['username']} <br/> 
           {userData['role'].toUpperCase()}
        </div>

       </center>
    </div>
       <div style={{marginLeft:mobile ? '100px' : '250px', marginTop:'25px'}}>
       <center>  <img src={Logo} width={mobile ? "250px" : "500px"} /> 
           {(screen=="bounties") && <PosterBounties user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} stripe={stripe}/>}
           {(screen=="chat") && <Chat user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} stripe={stripe}/>}
       </center>
       </div> 
    </div>
  );
};

export default PosterHome;
