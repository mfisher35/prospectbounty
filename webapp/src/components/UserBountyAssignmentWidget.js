import React, { useEffect, useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'
import { deleteField, where, query, doc, getDocs, getDoc, collection, setDoc, addDoc, getFirestore } from "firebase/firestore";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {modifyBountyAPI} from './APIHelpers';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const UserBountyAssignmentWidget = ({user, auth, db, userData, otherId, otherUsername, setManagingUser,managingUser}) => {
   
  const [myBounties, setMyBounties] = useState([]);
  const [modifying, setModifying] = useState(false);
  
  const onManageUser = async () => {
    let myList = []
    const q = query(collection(db, "bountyList"), where("posterId", "==", user.uid)); 
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
       let docData = doc.data();
       docData['id'] = doc.id;
       if(!docData['hunterId'] || docData['hunterId'] == otherId || docData['hunterId'] == "none")
         myList.push(docData);
     });
    

    setMyBounties(myList);
    setManagingUser(true);
  }

  const onUnAssign = async (bounty) => {
     setModifying(true);
     try {
       bounty['hunterId'] = "none";
       let resp = await modifyBountyAPI(user,bounty);
       if(resp['result'] == 'success')
         setMyBounties(myBounties.map(oldBounty=>{
           return oldBounty['id'] == bounty['id'] ? bounty : oldBounty;
       }))
     } catch (e) {console.log(e)}
     setModifying(false);
  }

  const onAssign = async (bounty) => {
     setModifying(true);
     try {
       bounty['hunterId'] = otherId;
       let resp = await modifyBountyAPI(user,bounty);
       if(resp['result'] == 'success')
         setMyBounties(myBounties.map(oldBounty=>{
           return oldBounty['id'] == bounty['id'] ? bounty : oldBounty;
       }))
     } catch (e) {console.log(e)}
     setModifying(false);
  }

  return (
    <div style={{cursor:'pointer'}}>
     
      {managingUser ?

       <div>
        <h3>  <b>   Bounty Assignment </b></h3>
          {modifying && <Spinner variant="primary"/>}
          <center>
          {myBounties.map(bounty=>(
             <div style={{border:'1px solid #967f5a',backgroundColor:'white',width:'300px',margin:'20px',padding:'10px',borderRadius:'10px'}}>
                
             <span style={{fontSize:'14pt',fontWeight:'600'}}>   {bounty['bountyName']} </span> <br/>
             {bounty['hunterId'] == otherId && <> <HowToRegIcon style={{color:'green'}}/><span style={{fontWeight:'600',color:"green"}}> {` ${otherUsername} is assigned`} </span> <br/> </>}

             <span style={{fontSize:'10pt',color:'#595959'}}>   {bounty['targetDescr']}</span> <br/>

             {!modifying && <div className="bounty-btn" style={{marginTop:'7px'}}>
                 {
                 bounty['hunterId'] == otherId ? 
                 <div onClick={e=>onUnAssign(bounty)}>  <PersonRemoveIcon style={{color:'#850505'}} fontSize="sm"/>  <span style={{fontSize:'10pt',color:'#850505'}}>{`Unassign ${otherUsername}`}  </span> </div>
                 : 
                 <div onClick={e=>onAssign(bounty)} >   <PersonAddIcon fontSize="sm"/> <span style={{fontSize:'10pt'}}>{`Assign ${otherUsername}`}  </span> </div>
                 }
              </div>}
             </div> 
             
           ))}</center> 
       </div>
       : 
       <div className="bounty-btn" onClick={e=>onManageUser()}>
         <ManageAccountsIcon style={{fontSize:'10pt',color:'black',marginRight:'4px'}}/>
         <span style={{fontSize:'10pt',color:'black'}}> Assign Bounty </span>     </div>}
     
    </div>
  );
};

export default UserBountyAssignmentWidget;
