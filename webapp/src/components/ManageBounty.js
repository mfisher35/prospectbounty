import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Spinner from 'react-bootstrap/Spinner';

const ManageBounty = ({bountyData, onBack}) => {
  const [saving,  setSaving] = useState(false);
  const [thisBountyData,  setThisBountyData] = useState(bountyData);

  const fields = [{name:'Bounty Name',field:'bountyName'},{name:'Description',type:'textarea',field:'description'},{name:'Target Description',field:'targetDescr',type:'textarea'}];

  const modifyBountyField = (field,value)=>{
    let tempData = {...bountyData};
    console.log('v',value)
    tempData[field] = value;
    setThisBountyData(tempData);
  }

  return (
    <div>

      <div style={{width:'fit-content',backgroundColor:'#ddd',borderRadius:'20px',border:'1px solid #ccc'}} onClick={e=>onBack()}> <ArrowBackIcon/> </div> 
    <div style={{fontSize:'10pt',marginTop:'30px'}}> {bountyData['hunterUsername'] ? "Assigned To: " + bountyData['hunterUsername'] : "Bounty is Currently Unassigned"}</div>
    {fields.map((field) => {
    return <div style={{margin:'10px'}} className="tacontainer"> <label className="talabel"> {field['name']} </label> 
      {
        field['type'] == 'textarea' ?
        <textarea className="text-area" value={thisBountyData[field['field']]} onChange={e=>modifyBountyField(field['name'],e.target.value)} rows="10" cols="30" /> 
       :
        <input value={thisBountyData[field['field']]} onChange={e=>modifyBountyField(field['name'],e.target.value)}/>  
      } 
    </div>})}
    {saving ? <Spinner variant="primary"/> : 
    <div>
       <Button variant="success"> Pay Assignee  </Button> <span style={{marginLeft:'5px'}}> </span>
       <Button> Save </Button> <span style={{marginLeft:'5px'}}> </span>
       <Button variant="danger"> Delete Bounty </Button>
    </div>
    }
    </div>

     
  );
};

export default ManageBounty;
