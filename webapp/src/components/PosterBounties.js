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

  const onBack = () => {
    setAddingBounty(false);
  }
  return (
   <>
    <div style={{marginTop:'40px'}}>
    </div>
     {!addingBounty && <BountyList user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData}/> }
      <AddBountyWidget user={user} auth={auth} db={db} userData={userData} bounties={bounties} setBounties={setBounties} mobile={mobile} setAddingBounty={setAddingBounty} stripe={stripe} onBack={onBack}/>

   </>
  );
};

export default PosterBounties;
