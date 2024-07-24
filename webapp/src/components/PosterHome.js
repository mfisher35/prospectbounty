import React, { useState, useEffect } from 'react';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import styled from 'styled-components';
import PosterBounties from './PosterBounties';
import { collection, query, where, getDocs } from "firebase/firestore";
import BountyList from './BountyList';
import Chat from './Chat';

const PosterHome = ({user, auth, db, storage, mobile, userData, setUserData, stripe}) => {
  //const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState("home");
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
      <center> <img src={mobile ? Logosm : Logo} width={mobile ? '50px' : '200px'} /> </center>
      <ul>
        <li onClick={e=>setScreen("home")}>Home</li>
        <li onClick={e=>setScreen("chat")}>Chat</li>
      </ul>
    </div>
       <div style={{marginLeft:mobile ? '100px' : '250px', marginTop:'25px'}}>
       <center>  <img src={Logo} width={mobile ? "250px" : "500px"} /> 
           {(screen=="home") && <PosterBounties user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} stripe={stripe}/>}
           {(screen=="chat") && <Chat user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} stripe={stripe}/>}
       </center>
       </div> 
    </div>
  );
};

export default PosterHome;
