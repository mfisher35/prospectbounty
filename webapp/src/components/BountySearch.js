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
import BountyList from './BountyList';

const BountySearch = ({user, auth, db, userData, setUserData, onChat}) => {
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
   let results = [];

   let querySnapshot = await getDocs(firestoreQuery);
   querySnapshot.forEach((doc)=>{
      let docData = doc.data();
      docData['id'] = doc.id;
      results.push(docData);
     });
   console.log(results);
   setSearchResults(results);
  }
  
  return (
  searchResults ? 

   <div> 
     <BountyList user={user} auth={auth} db={db} userData={userData} setUserData={setUserData} onChat={onChat} bounties={searchResults}/> 
   </div>

   :
   <div style={{textAlign:'left',padding:"10px 30px"}}>
     <span style={{fontSize:'30px',fontWeight:'600'}}> Search Bounties </span>
   <div style={{backgroundColor:'white',marginTop:'20px',padding:'20px',borderRadius:'15px',textAlign:'left'}}>

    {bountyFields.filter(field=>Object.keys(searchData).indexOf(field['field']) >= 0).map((field) => {
    return <div style={{margin:'10px',display:'inline-block',verticalAlign:'middle'}}>
        <div style={{display:'flex'}}> <HighlightOffIcon style={{color:'red',fontSize:'10pt',cursor:'pointer',marginRight:'10px'}} onClick={e=>deleteCriteria(field['field'])}/>  

        <label className="talabel"> {field['name']} </label> </div>
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
 
    

    <div style={{marginBottom:'20px',marginTop:'40px',display:'flex',justifyContent:'flex-start'}}>
           <div style={{cursor:'pointer',fontWeight:'600',marginRight:'20px',marginTop:'8px'}} onClick={e=>setAdding(true)} > 
              <AddIcon style={{border:'1px solid black',borderRadius:'20px',marginRight:'4px',marginBottom:'3px'}}/> Add Search Criteria 
           </div>
           <div>
           {adding &&  <select value="" onChange={e=>{modifySearchField(e.target.value,"");setAdding(false)}}> 
        <option value="" disabled hidden> Choose Criteria  </option>
        {bountyFields.filter(f=>Object.keys(searchData).indexOf(f['field'])<0).map(field=>{
            return  <option value={field['field']}> {field['name']} </option>
        })} 
           }
      </select>}
         </div>
     <br/>

    </div>
       <Button style={{border:'none',backgroundColor:'#dfbb81',color:'black'}} onClick={e=>{onSearch()}}> <SearchIcon style={{fontSize:'16pt',marginBottom:'3px'}}/> Search </Button> <span style={{marginLeft:'5px'}}> </span>
    </div>
  </div>     
  );
};

export default BountySearch;
