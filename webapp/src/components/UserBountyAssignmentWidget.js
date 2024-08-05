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
    console.log(myList);
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
       <h4>  Assign User:  <br/><b><i> {otherUsername}</i> </b>  </h4>
     
      {managingUser ?

       <div>
          {modifying && <Spinner variant="primary"/>}
          {myBounties.map(bounty=>(
             <div style={{border:'1px solid black',width:'300px',margin:'20px',padding:'10px',borderRadius:'10px'}}>
                
             {bounty['hunterId'] == otherId && <> <HowToRegIcon/> <br/> </>}
             <span>   {bounty['bountyName']} </span> <br/>
             <span style={{fontSize:'10pt',color:'#595959'}}>   {bounty['targetDescr']}</span> <br/>

             {!modifying && <div className="assignment-user">
                 {
                 bounty['hunterId'] == otherId ? 
                 <div onClick={e=>onUnAssign(bounty)}>  <PersonRemoveIcon fontSize="sm"/>  <span style={{fontSize:'10pt'}}>{'Unassign'}  </span> </div>
                 : 
                 <div onClick={e=>onAssign(bounty)} >   <PersonAddIcon fontSize="sm"/> <span style={{fontSize:'10pt'}}>{'Assign'}  </span> </div>
                 }
              </div>}
             </div> 
             
           ))} 
       </div>
       : 
       <div onClick={e=>onManageUser()}>
         <ManageAccountsIcon style={{fontSize:'10pt',color:'blue',marginRight:'4px'}}/>
         <span style={{fontSize:'10pt',color:'blue'}}> Bounty Assignments </span>     </div>}
     
    </div>
  );
};

export default UserBountyAssignmentWidget;
