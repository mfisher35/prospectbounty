import React, { useState } from 'react';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import HunterInit from './HunterInit';
import styled from 'styled-components';

const HunterHome = ({user, auth, db, storage, mobile, userData, setUserData}) => {
  //const [userData, setUserData] = useState(null);



  const cleanError = (error) => {
  }
  console.log('www',userData)
  return (
    <div style={{fontFamily:'Plus Jakarta Sans',fontSize:'12pt'}}>
       <div className="sidebar" style={{width:mobile ? "100px" : "250px"}}>
      <center> <img src={mobile ? Logosm : Logo} width={mobile ? '50px' : '200px'} /> </center>
      <ul>
        <li>Home</li>
        <li>Matches</li>
        <li><a href="#event">Event Planner</a></li>
      </ul>
    </div>
       <div style={{width:'100vw',height:'100vh',marginTop:'25px'}}>
         <center> 
           {!userData['closeContacts'] && <HunterInit user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData}/>}
         </center>
       </div></div> 
  );
};

export default HunterHome;
