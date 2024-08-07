import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';
import AddIcon from '@mui/icons-material/Add';
import {deleteDoc, doc, collection } from "firebase/firestore";
import {modifyBountyAPI, deleteBountyAPI} from './APIHelpers';
import {bountyFields, toTitleCase, lowerAll, states, orgTypes, industryTypes } from './Helpers';

const BountySearch = ({user, auth, db, userData, setUserData}) => {
  const [processing,  setProcessing] = useState(false);
  const [searchData,  setSearchData] = useState({});

  
  const modifyBountyField = (field,value)=>{
    let tempData = {...searchData};
    tempData[field] = value;
    setSearchData(tempData);
  }
  
    
   const onSave = async () => {
    setProcessing(true);
    let resp = await modifyBountyAPI(user,lowerAll(searchData));
    setProcessing(false)
    if(resp['result'] == 'success')
       onBack();
  };
  

  
  return (
    <div>

    {bountyFields.filter(field=>Object.keys(searchData).indexOf(field['field']) >= 0).map((field) => {
    return searchData[field['field']] && <div style={{margin:'10px'}} className="tacontainer"> <label className="talabel"> {field['name']} </label> 
      {
        field['type'] == 'textarea' &&
        <textarea className="text-area" value={searchData[field['field']]} onChange={e=>modifyBountyField(field['field'],e.target.value)} rows="10" cols="30" /> } 
       
     { field['type'] == 'text' &&
        <input value={toTitleCase(searchData[field['field']])} onChange={e=>modifyBountyField(field['field'],e.target.value)}/>  
      } 
      { field['selector'] &&
       field.selector(searchData[field['field']],modifyBountyField)  
      } 

    </div>})}
 
    

    {processing ? <Spinner variant="primary"/> : 
    <div style={{marginBottom:'20px'}}>
         <center> <div style={{color:'#007aff',marginTop:'15px',cursor:'pointer'}}> <AddIcon style={{border:'1px solid #007aff',borderRadius:'20px',color:'#007aff'}} onClick={e=>{setSearchData({'bountyName':'pooper'})}}/> Add </div> </center>

       <Button onClick={e=>onSave()}> Search </Button> <span style={{marginLeft:'5px'}}> </span>
    </div>
    }
    </div>

     
  );
};

export default BountySearch;
