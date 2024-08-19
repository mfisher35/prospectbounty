import React, { useState, useEffect } from 'react';
import UserBar from './UserBar';
import PersonIcon from '@mui/icons-material/Person';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import styled from 'styled-components';
import PosterBounties from './PosterBounties';
import { collection, query, where, getDocs } from "firebase/firestore";
import BountyList from './BountyList';
import Chat from './Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';

const PosterHome = ({user, auth, db, storage, mobile, userData, setUserData, stripe}) => {
  //const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState("bounties");
  const [myBounties, setMyBounties] = useState(null);
  const [hover,setHover] = useState(null);

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

  const sbColor = (section) => {
    return section == screen ?
       {color:'#DFBB81',backgroundColor: "#1d2931"} : {backgroundColor : hover==section ? "#1d2931" : "#021526",color:'white'}
  }

  const selectedItem = (section) => {
    if(section == screen)
      return <span style={{marginRight:'10px',textAlign:'left',backgroundColor:'#DFBB81',width: '6px',borderRadius: '12px 0px 0px 12px'}}> &nbsp; </span> 
    else return <span style={{marginRight:'10px',textAlign:'left',backgroundColor:'#021526',width: '6px',borderRadius: '12px 0px 0px 12px'}}> &nbsp; </span> 
  }

  const iconStyle = {marginRight:'5px',fontSize:'13pt',color:'white',marginBottom:'2px'};

  return (
    <div style={{fontFamily:'Plus Jakarta Sans',fontSize:'12pt'}}>
       <div className="sidebar" style={{width:mobile ? "100px" : "250px"}}>
      <center> 
        <img src={mobile ? Logosm : Logo} width={mobile ? '50px' : '200px'} /> 
        <div style={{paddingBottom:'20px'}}>hi </div>
     </center>
      <ul>
        <div className="sbsection" style={sbColor("bounties")} onMouseEnter={e=>setHover("bounties")} onMouseLeave={e=>setHover(null)}>
           {selectedItem("bounties")}
           <li onClick={async (e)=>{await setScreen("chat");setScreen("bounties");}}> <CoPresentOutlinedIcon style={iconStyle}/> My Bounties</li>
        </div>
        <div className="sbsection" style={sbColor("chat")} onMouseEnter={e=>setHover("chat")} onMouseLeave={e=>setHover(null)}>
           {selectedItem("chat")}
           <li onClick={async (e)=>{await setScreen("bounties"); setScreen("chat")}}><ChatOutlinedIcon style={iconStyle}/> Chat</li>
        </div>
      </ul>
    </div>
       <div style={{marginLeft:mobile ? '100px' : '250px'}}>
       <center>  
         <UserBar user={user} mobile={mobile} userData={userData} />
           {(screen=="bounties") && <PosterBounties user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} stripe={stripe}/>}
           {(screen=="chat") && <Chat user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} stripe={stripe}/>}
       </center>
       </div> 
    </div>
  );
};

export default PosterHome;
