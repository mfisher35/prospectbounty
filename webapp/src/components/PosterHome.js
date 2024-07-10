import React, { useState, useEffect } from 'react';
import Logo  from '../assets/logofull.png';
import Logosm  from '../assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import styled from 'styled-components';
import PosterInit from './PosterInit';
import { collection, query, where, getDocs } from "firebase/firestore";


const PosterHome = ({user, auth, db, storage, mobile, userData, setUserData}) => {
  //const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState("home");
  const [myBounties, setMyBounties] = useState(null);

  const cleanError = (error) => {
  }

   useEffect(() => {
   let myList = []
   const q = query(collection(db, "bountyList"), where("poster", "==", user.uid));

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
        <li>Home</li>
        <li>My Bounties</li>
      </ul>
    </div>
       <div style={{width:'100vw',height:'100vh',marginLeft:mobile ? '50px' : '200px', marginTop:'25px'}}>
       <center>  <img src={Logo} width="500px" /> 
           {(myBounties?.length ==0) && <PosterInit user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData}/>}
       </center>
       </div> 
    </div>
  );
};

export default PosterHome;
