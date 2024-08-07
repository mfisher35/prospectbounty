import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { lowerAll, states, orgTypes, industryTypes }  from './Helpers';

const AddContactsWidget = ({setContacts, contacts}) => {
  const [addingContact, setAddingContact] = useState(null);
  const [addContactData, setAddContactData] = useState({});

  
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
    <div>
       {contacts.length > 0 && 
         contacts.map((item,index) => (<> <span style={{padding:'10px',borderRadius:'15px',backgroundColor:'#d4d2c1'}}> {item['fullname'] + " - " + item['position'] + " - " + item['organization']} </span><div style={{marginBottom:'30px'}}/></>))
       }

       {!addingContact && <Button primary onClick={e=>setAddingContact(true)}> + Add Contact </Button>}
       {addingContact && <div>
        <input size="40" placeholder="Full Name" value={addContactData['fullname']} onChange={e=>changeAddContactData('fullname',e.target.value)} type="text"/> <br/>
         <input placeholder="Organization" type="text"  value={addContactData['organization']} onChange={e=>changeAddContactData('organization',e.target.value)}/> <span style={{marginRight:'10px'}}/>
          {orgTypes(addContactData['organizationType'],changeAddContactData)}
          {industryTypes(addContactData['industryType'],changeAddContactData)}

         <input placeholder="City" type="text" value={addContactData['city']} onChange={e=>changeAddContactData('city',e.target.value)}/><span style={{marginRight:'10px'}}/> 
          {states(addContactData['state'],changeAddContactData)} <br/>

         <input placeholder="Position" type="text" value={addContactData['position']} onChange={e=>changeAddContactData('position',e.target.value)}/><span style={{marginRight:'10px'}}/> <br/>
         <input placeholder="LinkedIn Link (if available)" type="text" value={addContactData['linkedin']} onChange={e=>changeAddContactData('linkedin',e.target.value)} size="40"/> <br/>
         <center><Button variant="primary" onClick={e=>addContact()}> Add </Button> </center>
        </div>}
        
    </div>
  );
};

export default AddContactsWidget;
