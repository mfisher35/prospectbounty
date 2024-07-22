import React, { useState } from 'react';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import AddBountyWidget from './AddBountyWidget'
import BountyList from './BountyList'

const PosterBounties = ({user, auth, db, storage, mobile, userData, setUserData, stripe}) => {
  const [bounties, setBounties] = useState([]);
  const [addingBounty,  setAddingBounty] = useState(false);


  const cleanError = (error) => {
  }

  return (
   <>
     {!addingBounty && <BountyList user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData}/> }
    <div style={{marginTop:'0px',backgroundColor:'#ffffff',width:'fit-content',padding:'30px',borderRadius:'8px'}}>
      <h4> {addingBounty ? "" : "Add A New Bounty:"} </h4>
      <AddBountyWidget user={user} auth={auth} db={db} userData={userData} bounties={bounties} setBounties={setBounties} mobile={mobile} setAddingBounty={setAddingBounty} stripe={stripe}/>
    </div>
   </>
  );
};

export default PosterBounties;
