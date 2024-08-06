import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import {collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; 
import AddIcon from '@mui/icons-material/Add';

const BountySearch = ({user, auth, db, storage, mobile, userData, type}) => {
   const [bountyList, setBountySearch] = useState([]);
   const [criteria, setCriteria] = useState([["",""]]);
  
/*
   useEffect(() => {


   }, []);
*/
  
  const changeCriteria = (i,cat,value)=>{
    let newCriteria = [... criteria];
    if(i > newCriteria.length){
      if(newCriteria.length == 0)
        newCriteria.push(['','']);
      else if(newCriteria[i-2][0] !='')
        newCriteria.push(['','']);
    }
    else if(cat && value){
      newCriteria[i] = [cat,value];
    }
    else if(cat){
      newCriteria[i][0] = cat;
    }
    setCriteria(newCriteria);
  }

  const removeCriteria = (i) => {
   let newCriteria = criteria.filter((item,ix)=> {return i != ix});
   setCriteria(newCriteria);

  }

  const alreadyPicked = (i,cat) => {
    if(criteria[i][0] == cat) return false;
    return criteria.filter(item=>item[0] == cat).length > 0;
  }

  const onSubmit = async () => {
    console.log(bountyList);
  }

  return (<div style={{marginTop:'40px'}}>
  <div style={{border:'1px solid #bbb',display:'flex',alignItems:'center',justifyContent:'space-evenly',borderRadius:'10px',padding:'8px',alignContent:'center'}}> <center>
   {criteria.map((crit,i)=>{ return (
    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',alignContent:'center',padding:'3px'}}>  <div>
        <span style={{color:'red',marginRight:'7px',cursor:'pointer'}} onClick={e=>removeCriteria(i)}>ⓧ </span>
        <select value={criteria[i][0]} style={{marginBottom:'0px'}} onChange={e=>{changeCriteria(i,e.target.value);}}> 
           <option value="" disabled hidden> Pick Criteria </option>
           {!alreadyPicked(i,"Full Name") && <option value="Full Name" label="Full Name" />}
           {!alreadyPicked(i,"Organization") && <option value="Organization" label="Organization" />}
           {!alreadyPicked(i,"Organization Type") && <option value="Organization Type" label="Org Type" />}
           {!alreadyPicked(i,"Organization Department") && <option value="Organization Department" label="Org Dept" />}
        </select>
      </div>
      <div style={{width:'10px'}}> </div>
      <div>
        <input placeholder="Search" value={criteria[i][1]} size="40" style={{marginBottom:'0px'}} onChange={e=>changeCriteria(i,criteria[i][0],e.target.value)}/> 
      </div></div>)})} </center></div>
  <center> <div style={{color:'#007aff',marginTop:'15px',cursor:'pointer'}}> <AddIcon style={{border:'1px solid #007aff',borderRadius:'20px',color:'#007aff'}} onClick={e=>changeCriteria(criteria.length+1)}/> Add </div> </center>
 </div> 
);
};

export default BountySearch;
