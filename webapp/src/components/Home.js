import React, { useState, useEffect } from 'react';
import UserBar from './UserBar';
import PersonIcon from '@mui/icons-material/Person';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import BountySearch from './BountySearch';
import {onSnapshot, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import styled from 'styled-components';
import PosterBounties from './PosterBounties';
import { collection, query, where, getDocs } from "firebase/firestore";
import BountyList from './BountyList';
import Chat from './Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import SearchIcon from '@mui/icons-material/Search';

const Home = ({user, auth, db, storage, mobile, userData, setUserData, stripe}) => {
  //const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState(userData?.role == 'poster' ? 'bounties' : 'bountylist');
  const [myBounties, setMyBounties] = useState(null);
  const [hover,setHover] = useState(null);
  const [chatUID, setChatUID] = useState(null);
  const [chatName, setChatName] = useState(null);

  const cleanError = (error) => {
  }


  //get new notifications
  const startSubscribe = () => {
      const docRef = doc(db, 'userData', user.uid);

      const unsubscribe = onSnapshot(docRef, (doc) => {
        setUserData(doc.data());
      });

      return () => unsubscribe();
  }

  useEffect(() => {
      startSubscribe(); 
  }, []);


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
       {cursor:'pointer',color:'#DFBB81',backgroundColor: "#1d2931"} : {cursor:'pointer',backgroundColor : hover==section ? "#1d2931" : "#021526",color:'white'}
  }

  const selectedItem = (section) => {
    if(section == screen)
      return <span style={{marginRight:'10px',textAlign:'left',backgroundColor:'#DFBB81',width: '6px',borderRadius: '12px 0px 0px 12px'}}> &nbsp; </span> 
    else return <span style={{marginRight:'10px',textAlign:'left',backgroundColor:'#021526',width: '6px',borderRadius: '12px 0px 0px 12px'}}> &nbsp; </span> 
  }

  const iconStyle = {marginRight:'5px',fontSize:'13pt',color:'white',marginBottom:'2px'};

  //start chat with uid, name
  const onChat = (uid,name)=> {
     setChatUID(uid);
     setChatName(name);
     setScreen('chat');
  }


  const goToChat = async () => {
     const docRef = doc(db, 'userData', user.uid);
     let tUserData = {... userData}
     tUserData['newMessages'] = 0;
     await updateDoc(docRef,tUserData);
     await setScreen("bounties"); 
     setScreen("chat")
  }
 
  return (
    <div style={{fontFamily:'General Sans',fontSize:'12pt',width:'100vw'}}>
       <div className="sidebar" style={{width:mobile ? "100px" : "250px"}}>
      <center> 
        <img src={mobile ? Logosm : Logo} width={mobile ? '50px' : '200px'} /> 
        <div style={{paddingBottom:'20px'}}> </div>
     </center>
      <ul>

       {/*Bounty Hunter Side Bar*/}
       {userData['role'] == "hunter" && (<>
      <ul> 
        <div className="sbsection" style={sbColor("bountylist")} onMouseEnter={e=>setHover("bountylist")} onMouseLeave={e=>setHover(null)} onClick={e=>setScreen("bountylist")}>
           {selectedItem("bountylist")} 
           <li>  <AutoAwesomeMotionOutlinedIcon style={iconStyle}/>  Bounty List</li>
        </div>
        <div className="sbsection" style={sbColor("mybounties")} onMouseEnter={e=>setHover("mybounties")} onMouseLeave={e=>setHover(null)} onClick={e=>setScreen("mybounties")}> 
           {selectedItem("mybounties")}
           <li> <CoPresentOutlinedIcon style={iconStyle}/>  My Bounties</li>
        </div>
        <div className="sbsection" style={sbColor("search")} onMouseEnter={e=>setHover("search")} onMouseLeave={e=>setHover(null)} onClick={e=>setScreen("search")}> 
           {selectedItem("search")}
           <li><SearchIcon style={iconStyle}/>             Search</li>
        </div>
        <div className="sbsection" style={sbColor("chat")} onMouseEnter={e=>setHover("chat")} onMouseLeave={e=>setHover(null)} onClick={e=>goToChat()}>
          {selectedItem("chat")}
          <div className="notification-icon"> <ChatOutlinedIcon style={{... iconStyle,marginRight:'6px', marginBottom:'0px'}}/> Chat  {userData['newMessages'] > 0 && <div className="badge"> {userData['newMessages']} </div>} </div>
        </div>
      </ul>

    </>)}
    {/* End Hunter Sidebar */}
 

    {/* Poster Sidebar */}
        { userData['role'] == 'poster' && <> <div className="sbsection" style={sbColor("bounties")} onMouseEnter={e=>setHover("bounties")} onMouseLeave={e=>setHover(null)} onClick={async (e)=>{await setScreen("chat");setScreen("bounties");}} >
           {selectedItem("bounties")}
           <li> <CoPresentOutlinedIcon style={iconStyle}/> My Bounties</li>
        </div>
        <div className="sbsection" style={sbColor("chat")} onMouseEnter={e=>setHover("chat")} onMouseLeave={e=>setHover(null)} onClick={e=>goToChat()}>
           {selectedItem("chat")}
           <div className="notification-icon"><ChatOutlinedIcon style={{... iconStyle, marginBottom:'0px',marginRight:'6px'}}/>  Chat {userData['newMessages'] > 0 && <div className="badge"> {userData['newMessages']} </div>}  </div>
        </div> </>}
    {/* End Poster Sidebar */}
      </ul>
    </div> 
       <div style={{marginTop:'0px',marginLeft:mobile ? '100px' : '250px'}}>
       <center>  
         <UserBar user={user} mobile={mobile} userData={userData} />
           {(screen=="bounties") && <PosterBounties user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} stripe={stripe}/>}
           {(screen=="chat") && <Chat user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} stripe={stripe}/>}
           {(["bountylist","mybounties"].indexOf(screen) >= 0) && <BountyList key={'blist'+screen} user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} type={screen=="bountylist" ? 'all' : 'assignedToMe'} onChat={onChat}/>}
           {screen == "search" && <BountySearch user={user} db={db} auth={auth} userData={userData} setUserData={setUserData} onChat={onChat}/>}

       </center>
       </div> 
    </div>
  );
};

export default Home;
