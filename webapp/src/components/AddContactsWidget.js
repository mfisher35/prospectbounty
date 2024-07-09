import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'


const AddContactsWidget = ({setContacts, contacts}) => {
  const [addingContact, setAddingContact] = useState(null);
  const [addContactType, setAddContactType] = useState(null);
  const [addFname, setAddFname] = useState("");
  const [addLname, setAddLname] = useState("");
  const [addCompany, setAddCompany] = useState("");
  const [addLinkedIn, setAddLinkedIn] = useState("");
  const [addPosition, setAddPosition] = useState("");

  const addContact = () => {
   let addContactData = {};
   if(addContactType == "linkedin")
     addContactData['linkedin'] = addLinkedIn;
   if(addContactType == "person"){
     addContactData['fname'] = addFname;
     addContactData['lname'] = addLname;
     addContactData['company'] = addCompany;
     addContactData['position'] = addPosition;
   }
   let lcontacts = contacts;
   lcontacts.push(addContactData);
   setContacts(lcontacts);
   clearContact();
  }

  const clearContact = () => {
    setAddContactType(null);
    setAddingContact(null);
    setAddFname("");
    setAddLname("");
    setAddCompany("");
    setAddPosition("");
    setAddLinkedIn("");
  }

  return (
    <div>
       {contacts.length > 0 && 
         contacts.map((item,index) => (<> <span style={{padding:'10px',borderRadius:'15px',backgroundColor:'#d4d2c1'}}> {item['linkedin'] ? item['linkedin'] : item['fname'] + " - " + item['lname'] + " - " + item['position'] + " - " + item['company']} </span><div style={{marginBottom:'30px'}}/></>))
       }

       {!addingContact && <Button primary onClick={e=>setAddingContact(true)}> + Add Contact </Button>}
       {addingContact && <div>
         <input type="radio" checked={addContactType=="linkedin"} onClick={e=>setAddContactType("linkedin")}/> LinkedIn Link 
         <span style={{marginRight:'10px'}}> </span> 
         <input type="radio" checked={addContactType=="person"} onClick={e=>setAddContactType("person")}/> Person Description
        </div>}
       {(addingContact && addContactType=="linkedin") && <div>
         <input type="text" placeholder="LinkedIn Link" value={addLinkedIn} onChange={e=>setAddLinkedIn(e.target.value)} size="40"/> 
         <center><Button variant="primary" onClick={e=>addContact()}> Add </Button> </center>
        </div>}
       {(addingContact && addContactType=="person") && <div>
         <input placeholder="First Name" value={addFname} onChange={e=>setAddFname(e.target.value)} type="text"/> <span style={{marginRight:'10px'}}/>
         <input placeholder="Last Name" type="text"  value={addLname} onChange={e=>setAddLname(e.target.value)} /> <span style={{marginRight:'10px'}}/>
         <input placeholder="Company" type="text"  value={addCompany} onChange={e=>setAddCompany(e.target.value)}/> <span style={{marginRight:'10px'}}/>
         <input placeholder="Position" type="text" value={addPosition} onChange={e=>setAddPosition(e.target.value)}/><span style={{marginRight:'10px'}}/> <br/>
         <center><Button variant="primary" onClick={e=>addContact()}> Add </Button> </center>
        </div>}
        
    </div>
  );
};

export default AddContactsWidget;
