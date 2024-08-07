import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';
import AddIcon from '@mui/icons-material/Add';
import {query, getDocs, where, deleteDoc, doc, collection } from "firebase/firestore";
import {bountyFields, toTitleCase, lowerAll, states, orgTypes, industryTypes } from './Helpers';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const BountySearch = ({user, auth, db, userData, setUserData}) => {
  const [processing,  setProcessing] = useState(false);
  const [searchData,  setSearchData] = useState({});
  const [adding, setAdding] = useState(true);
  const [searching, setSetSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  
  const modifySearchField = (field,value)=>{
    console.log(field,value)
    let tempData = {...searchData};
    tempData[field] = value;
    setSearchData(tempData);
  }
  
  const deleteCriteria = (field) => {
    let tempData = {...searchData};
    delete tempData[field];
    setSearchData(tempData);
  }

  const onSearch = async () => {

   const lSearchData = lowerAll(searchData);

   const bountiesRef = collection(db, 'bountyList');
   let firestoreQuery = query(bountiesRef);

   Object.keys(lSearchData).forEach(key => {
       const value = lSearchData[key];
       console.log(key,value);
       firestoreQuery = query(firestoreQuery, where(key, '==', value));
       /*if (typeof value === 'object' && value.operator && value.value !== undefined) {
         //firestoreQuery = query(firestoreQuery, where(key, value.operator, value.value));
          } else { */
    })
   console.log('searching'); 
   let querySnapshot = await getDocs(firestoreQuery);
   querySnapshot.forEach((doc)=>{
      let docData = doc.data();
      docData['id'] = doc.id;
      console.log('SR',docData);
      //myList.push(docData);
     });
   console.log('done');
  }
  
  return (
    <div>

    {bountyFields.filter(field=>Object.keys(searchData).indexOf(field['field']) >= 0).map((field) => {
    return <div style={{margin:'10px'}} className="tacontainer"> 
    <div style={{width:'100%',textAlign:'left'}}> <HighlightOffIcon style={{color:'red',fontSize:'14pt',cursor:'pointer'}} onClick={e=>deleteCriteria(field['field'])}/> </div>
   <label className="talabel"> {field['name']} </label> 
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
 
    

    <div style={{marginBottom:'20px',marginTop:'40px'}}>
     {adding && <div> Add Search Criteria: <select value="" onChange={e=>{modifySearchField(e.target.value,"");setAdding(false)}}> 
        <option value="" disabled hidden> Choose Criteria  </option>
        {bountyFields.filter(f=>Object.keys(searchData).indexOf(f['field'])<0).map(field=>{
         return  <option value={field['field']}> {field['name']} </option>
        })} 
      }
      </select></div>}
       <center> 
        <div 
          onClick={e=>setAdding(true)} 
          style={{color:'#007aff',
                 cursor:'pointer'}}> 
             <AddIcon style={{border:'1px solid #007aff',borderRadius:'20px',color:'#007aff',marginRight:'4px',marginBottom:'3px'}}/> Add Search Criteria 
         </div>
        </center>
     <br/>

       <Button onClick={e=>{onSearch()}}> <SearchIcon style={{fontSize:'16pt',marginBottom:'3px'}}/> Search </Button> <span style={{marginLeft:'5px'}}> </span>
    </div>
    </div>

     
  );
};

export default BountySearch;
