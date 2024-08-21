import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { lowerAll, states, orgTypes, industryTypes }  from './Helpers';

const AddContactsWidget = ({setContacts, contacts}) => {
  const [addingContact, setAddingContact] = useState(null);
  const [addContactData, setAddContactData] = useState({});

  
  const splitStyle = {display:'flex',flexGrow:'1',flexDirection:'column',width:'45%'};

  const changeAddContactData = (field,value) => {
    let newAddContactData = {... addContactData};
    newAddContactData[field] = value;
    setAddContactData(newAddContactData);
  }

  const addContact = () => {
   let addContactData2 = {...addContactData};
   let lcontacts = contacts;
   lcontacts.push(addContactData2);
   setContacts(lcontacts);
   console.log(lcontacts);
   clearContact();
  }

  const clearContact = () => {
    setAddingContact(null);
    setAddContactData({});
  }

  return (
    <div style={{padding:'15px 40px'}}>
       {contacts.length > 0 && 
         contacts.map((item,index) => (<> <span style={{padding:'10px',borderRadius:'15px',backgroundColor:'#c3c2c6'}}> {item['fullname'] + " - " + item['position'] + " - " + item['organization']} </span><div style={{marginBottom:'30px'}}/></>))
       }

       {!addingContact && <Button className="bounty-assign-btn" onClick={e=>setAddingContact(true)}> + Add Contact </Button>}
       {addingContact && <div>
        Full Name:<br/>
        <input style={{width:'100%'}} placeholder="Full Name" value={addContactData['fullname']} onChange={e=>changeAddContactData('fullname',e.target.value)} type="text"/> <br/>
             Organization <br/>
            <input style={{width:'100%'}} placeholder="Organization" type="text"  value={addContactData['organization']} onChange={e=>changeAddContactData('organization',e.target.value)}/> 

        <div style={{display:'flex',flexDirection:'row'}}> 
           <div style={splitStyle}>
             Organization Type <br/>
             {orgTypes(addContactData['organizationType'],changeAddContactData)}
           </div>
           <div style={{width:'20px'}}/> 
           <div style={splitStyle}>
             Industry Type
             {industryTypes(addContactData['industryType'],changeAddContactData)}
           </div>
         </div>
       <br/> 
        <div style={{display:'flex',flexDirection:'row'}}> 
           <div style={splitStyle}>
            City <br/>
            <input placeholder="City" type="text" value={addContactData['city']} onChange={e=>changeAddContactData('city',e.target.value)}/> 
           </div>
           <div style={{width:'20px'}}/> 
           <div style={splitStyle}>
           State <br/>
          {states(addContactData['state'],changeAddContactData)} <br/>

           </div>
         </div>


        <div style={{display:'flex',flexDirection:'row'}}> 
           <div style={splitStyle}>
            Position<br/>

             <input placeholder="Position" type="text" value={addContactData['position']} onChange={e=>changeAddContactData('position',e.target.value)}/> 
           </div>
           <div style={{width:'20px'}}/> 
           <div style={splitStyle}>
            Linkedin<br/>
            <input placeholder="Linkedin Link" type="text" value={addContactData['linkedin']} onChange={e=>changeAddContactData('linkedin',e.target.value)} size="40"/> 
           </div>
         </div>
 


         <div style={{width:'100%',textAlign:'right',marginTop:'10px'}}><Button className="bounty-assign-btn" style={{padding:'10px'}} onClick={e=>addContact()}> Save Contact </Button> </div>
        </div>}
        
    </div>
  );
};

export default AddContactsWidget;
