import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import '../App.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const UserBar = ({user, auth, mobile, userData, type}) => {
 //  const [bountyList, setUserBar] = useState(bounties ?? []);


  return (
    <div style={{width:"100%",height:'80px',backgroundColor:'white',textAlign:'right',paddingRight:'40px',paddingTop:'15px'}}> 
           <div  style={{display:'flex',justifyContent:'flex-end'}}>
               <div> <AccountCircleIcon style={{fontSize:'29pt'}}/>   </div>
               <div style={{width:'10px',textAlign:'left'}}/>
               <div style={{textAlign:'left',fontSize:'8pt'}}>  
                <span style={{fontSize:'11pt'}}>  {userData['username']} </span> <br/>
                <span style={{fontSize:'8pt',fontWeight:'bold',color:'#ccc'}}> {userData['role'].toUpperCase()}   </span>
              </div>
           </div>

    </div>
  );
};

export default UserBar;
