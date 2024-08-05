import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Spinner from 'react-bootstrap/Spinner';

const ManageBounty = ({bountyData, onBack}) => {
  const [saving,  setSaving] = useState(false);
  const [thisBountyData,  setThisBountyData] = useState(bountyData);

  const modifyBountyField = (field,value)=>{
    let tempData = {...bountyData};
    console.log('v',value)
    tempData[field] = value;
    setThisBountyData(tempData);
  }

  return (
    <div>

      <div style={{width:'fit-content',backgroundColor:'#ddd',borderRadius:'20px',border:'1px solid #ccc'}} onClick={e=>onBack()}> <ArrowBackIcon/> </div> 
    {bountyData['hunterUsername']} <br/>
    Name: <input value={thisBountyData['bountyName']} onChange={e=>modifyBountyField("bountyName",e.target.value)}/> <br/>
    {bountyData['posterId']} <br/>
    {saving ? <Spinner variant="primary"/> : <Button> Save </Button>}
   </div>

     
  );
};

export default ManageBounty;
