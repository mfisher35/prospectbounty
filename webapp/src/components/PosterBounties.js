import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import AddBountyWidget from './AddBountyWidget'
import BountyList from './BountyList'
import ManageBounty from './ManageBounty';

const PosterBounties = ({user, auth, db, storage, mobile, userData, setUserData, stripe}) => {
  const [bounties, setBounties] = useState([]);
  const [addingBounty,  setAddingBounty] = useState(false);
  const [managing, setManaging] = useState(false);
  const [manageBountyData,setManageBountyData] = useState(null);

  const cleanError = (error) => {
  }

  const onManageBounty = (bounty) => {
    setManaging(true);
    setManageBountyData(bounty);
  }

  const onBack = () => {
    setAddingBounty(false);
    setManaging(false);
    setManageBountyData(null);
  }

  return (
   <>
    <div style={{marginTop:'40px'}}>
    </div>
     {(!addingBounty && !managing) && <BountyList user={user} auth={auth} db={db} storage={storage}  mobile={mobile} userData={userData} setUserData={setUserData} onManageBounty={onManageBounty}/> }
     { !managing && <AddBountyWidget user={user} auth={auth} db={db} userData={userData} bounties={bounties} setBounties={setBounties} mobile={mobile} setAddingBounty={setAddingBounty} stripe={stripe} onBack={onBack}/>}
     {managing && <ManageBounty bountyData={manageBountyData} onBack={onBack}/>}

   </>
  );
};

export default PosterBounties;
