import React, { useState } from 'react';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import AddBountyWidget from './AddBountyWidget'
import BountyList from './BountyList'

const PosterBounties = ({user, auth, db, storage, mobile, userData, setUserData}) => {
  const [bounties, setBounties] = useState([]);



  const cleanError = (error) => {
  }

  return (
   <>
     <BountyList user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} />
    <div style={{marginTop:'30px',backgroundColor:'#ffffff',width:'fit-content',padding:'30px',borderRadius:'8px'}}>
      <h4> Add A Bounty </h4>
      <AddBountyWidget user={user} auth={auth} db={db} userData={userData} bounties={bounties} setBounties={setBounties}/>
    </div>
   </>
  );
};

export default PosterBounties;
