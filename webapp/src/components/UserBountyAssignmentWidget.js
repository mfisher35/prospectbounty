import React, { useEffect, useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { where, query, doc, getDocs, getDoc, collection, setDoc, addDoc, getFirestore } from "firebase/firestore";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const UserBountyAssignmentWidget = ({user, auth, db, userData, otherId, otherUsername, setManagingUser,managingUser}) => {
   
  const [myBounties, setMyBounties] = useState([]);
  
  const onManageUser = async () => {
    let myList = []
    const q = query(collection(db, "bountyList"), where("posterId", "==", user.uid)); 
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
       let docData = doc.data();
       docData['id'] = doc.id;
       if(!docData['hunterId'] || docData['hunterId'] == otherId)
         myList.push(docData);
     });
    

    setMyBounties(myList);
    console.log(myList);
    setManagingUser(true);
  }
  
  return (
    <div style={{cursor:'pointer'}}>
       <h4>  <b><i> {otherUsername}</i> </b>  </h4>
     
      {managingUser ?

       <div>
          {myBounties.map(bounty=>(
             <div style={{border:'1px solid black',width:'fit-content',padding:'10px',borderRadius:'10px'}}>
                
               
             <span>   {bounty['bountyName']} </span> <br/>
             <span style={{fontSize:'10pt',color:'#595959'}}>   {bounty['targetDescr']}</span> <br/>

             <div className="assignment-user">
                 {
                 bounty['hunterId'] == otherId ? 
                   <PersonRemoveIcon fontSize="sm"/> 
                 : 
                 <>   <PersonAddIcon fontSize="sm"/> <span style={{fontSize:'10pt'}}>{'Assign'}  </span> </>
                 }
              </div>
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
