import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Spinner from 'react-bootstrap/Spinner';
import {deleteDoc, doc, collection } from "firebase/firestore";
import ConfirmModal from './ConfirmModal';
import {modifyBountyAPI, deleteBountyAPI} from './APIHelpers';
import {lowerAll} from './Helpers';

const ManageBounty = ({user, auth, db, userData, setUserData, bountyData, onBack}) => {
  const [processing,  setProcessing] = useState(false);
  const [thisBountyData,  setThisBountyData] = useState(bountyData);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const fields = [{name:'Bounty Name',field:'bountyName',type:"text"},{name:'My Offering',type:'textarea',field:'description'},{'name':'Full Name',field:'fullname',type:"text"},{name:'Target Description',field:'targetDescr',type:'textarea'},{name:'Organization',type:'text',field:'organization'},{'name':'Organization Type','field':'organizationType',type:'select'},{'name':'Industry Type','field':'industryType',type:'select'},{name:'LinkedIN Link',type:'text',field:'linkedin'}];

  
  const modifyBountyField = (field,value)=>{
    let tempData = {...thisBountyData};
    tempData[field] = value;
    setThisBountyData(tempData);
    console.log('tdddd',tempData)
  }
  
  const onConfirmDelete = async () => {
    setProcessing(true);
    console.log('tbd',thisBountyData);
    let resp = await deleteBountyAPI(user,thisBountyData);
    setProcessing(false);
    if(resp['result'] == 'success')
       onBack();
  };
    
   const onSave = async () => {
    setProcessing(true);
    let resp = await modifyBountyAPI(user,lowerAll(thisBountyData));
    setProcessing(false)
    if(resp['result'] == 'success')
       onBack();
  };
  

  
  return (
    <div>
      <ConfirmModal text="Are you sure you want to delete this bounty? It will become unassigned and your money will be refunded to your credit card" show={showConfirmDelete} handleClose={e=>setShowConfirmDelete(false)} onConfirm={onConfirmDelete} />
      <div style={{width:'fit-content',backgroundColor:'#ddd',borderRadius:'20px',border:'1px solid #ccc'}} onClick={e=>onBack()}> <ArrowBackIcon/> </div> 
    <div style={{fontSize:'10pt',marginTop:'30px'}}> {bountyData['hunterUsername'] ? "Assigned To: " + bountyData['hunterUsername'] : "Bounty is Currently Unassigned"}</div>
   {fields.map((field) => {
    return thisBountyData[field['field']] && <div style={{margin:'10px'}} className="tacontainer"> <label className="talabel"> {field['name']} </label> 
      {
        field['type'] == 'textarea' ?
        <textarea className="text-area" value={thisBountyData[field['field']]} onChange={e=>modifyBountyField(field['field'],e.target.value)} rows="10" cols="30" /> 
       :
        <input value={thisBountyData[field['field']]} onChange={e=>modifyBountyField(field['field'],e.target.value)}/>  
      
      } 
    </div>})}
    {processing ? <Spinner variant="primary"/> : 
    <div style={{marginBottom:'20px'}}>
       <Button variant="success"> Pay Assignee  </Button> <span style={{marginLeft:'5px'}}> </span>
       <Button onClick={e=>onSave()}> Save </Button> <span style={{marginLeft:'5px'}}> </span>
       <Button variant="danger" onClick={e=>setShowConfirmDelete(true)}> Delete Bounty </Button>
    </div>
    }
    </div>

     
  );
};

export default ManageBounty;
