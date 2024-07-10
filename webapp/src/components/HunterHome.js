import React, { useState } from 'react';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import HunterInit from './HunterInit';
import styled from 'styled-components';
import BountyList from './BountyList';

const HunterHome = ({user, auth, db, storage, mobile, userData, setUserData}) => {
  const [screen, setScreen] = useState("bountylist");



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
        <li onClick={e=>console.log(screen)}> someting </li>
      </ul>
    </div>)}
       <div style={{marginTop:'25px',marginLeft : mobile ? "100px" : "250px"}}>
         <center>  <img src={Logo} width="500px" /> 
          
           {!userData['closeContacts'] && <HunterInit user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData}/>}
           {userData['closeContacts'] && <BountyList key={'blist'+screen} user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} type={screen=="bountylist" ? 'all' : 'assignedToMe'}/>}
         </center>
       </div></div> 
  );
};

export default HunterHome;
