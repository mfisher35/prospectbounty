import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import styled from 'styled-components';
import AddContactsWidget from "./AddContactsWidget";
import {collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; 
import Logo  from '../assets/logofull.png';

const BountySearch = ({user, auth, db, storage, mobile, userData, type}) => {
   const [bountyList, setBountySearch] = useState([]);
   const [criteria, setCriteria] = useState([["Full Name",""]]);
  
/*
   useEffect(() => {


   }, []);
*/

  const onSubmit = async () => {
    console.log(bountyList);
  }

  return (
   criteria.map((i)=>{ return (
      <div>
        <select value={criteria[i][0]}> 
           <option value="Full Name"/>
           <option value="Organization"/>
           <option value="Organization Type"/>
           <option value="Organization Department"/>
        </select>
        <input placeholder="Search" value={criteria[i][1]}/> 
      </div>)}
  );
);
};

export default BountySearch;
