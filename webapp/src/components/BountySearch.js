import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';
import AddIcon from '@mui/icons-material/Add';
import {deleteDoc, doc, collection } from "firebase/firestore";
import {bountyFields, toTitleCase, lowerAll, states, orgTypes, industryTypes } from './Helpers';

const BountySearch = ({user, auth, db, userData, setUserData}) => {
  const [processing,  setProcessing] = useState(false);
  const [searchData,  setSearchData] = useState({});
  const [adding, setAdding] = useState(false);
  
  const modifySearchField = (field,value)=>{
    console.log(field,value)
    let tempData = {...searchData};
    tempData[field] = value;
    setSearchData(tempData);
  }
  
    
  

  
  return (
    <div>

    {bountyFields.filter(field=>Object.keys(searchData).indexOf(field['field']) >= 0).map((field) => {
    return <div style={{margin:'10px'}} className="tacontainer"> <label className="talabel"> {field['name']} </label> 
      {
        field['type'] == 'textarea' &&
        <textarea className="text-area" value={searchData[field['field']]} onChange={e=>modifySearchField(field['field'],e.target.value)} rows="10" cols="30" /> } 
       
     { field['type'] == 'text' &&
        <input value={toTitleCase(searchData[field['field']])} onChange={e=>modifySearchField(field['field'],e.target.value)}/>  
      } 
      { field['selector'] &&
       field.selector(searchData[field['field']],modifySearchField)  
      } 

    </div>})}
 
    

    <div style={{marginBottom:'20px'}}>
       <center> 
        <div 
          onClick={e=>setAdding(true)} 
          style={{color:'#007aff',
                 marginTop:'15px',
                 cursor:'pointer'}}> 
             <AddIcon style={{border:'1px solid #007aff',borderRadius:'20px',color:'#007aff'}} /> Add Search Criteria 
         </div>
        </center>
     <br/>
     {adding && <select onChange={e=>{modifySearchField(e.target.value,"");setAdding(false)}}>
        {bountyFields.filter(f=>Object.keys(searchData).indexOf(f['field'])<0).map(field=>{
           console.log('aaa',field);
         return  <option value={field['field']}> {field['name']} </option>
        })} 
      }
      </select>}
       <Button onClick={e=>{}}> Search </Button> <span style={{marginLeft:'5px'}}> </span>
    </div>
    </div>

     
  );
};

export default BountySearch;
