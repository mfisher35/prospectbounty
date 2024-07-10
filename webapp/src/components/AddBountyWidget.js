import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'


const AddBountyWidget = ({setBounties, bounties}) => {
  const [page, setPage] = useState('description')
  const [addingBounty, setAddingBounty] = useState(null);
  const [addBountyType, setAddBountyType] = useState(null);
  const [addBountyData, setAddBountyData] = useState({});

  const addBounty = () => {
   let lbounties = [...bounties];
   lbounties.push(addBountyData);
   setBounties(lbounties);
   clearBounty();
  }

  const clearBounty = () => {
    setAddBountyType(null);
    setAddingBounty(null);
    setAddBountyData({});
  }

  const changeBountyData = (field, text) => {
     let newBData = {...addBountyData};
     newBData[field] = text;
     console.log(newBData)
     setAddBountyData(newBData);
  }

  return (
    <div>
       {bounties.length > 0 && 
         bounties.map((item,index) => (<> <span style={{padding:'10px',borderRadius:'15px',backgroundColor:'#d4d2c1'}}> {item['linkedin'] ? item['linkedin'] : item['fname'] + " - " + item['lname'] + " - " + item['position'] + " - " + item['company']} </span><div style={{marginBottom:'30px'}}/></>))
       }

       {!addingBounty && <Button primary onClick={e=>setAddingBounty(true)}> + Add Bounty </Button>}
       {addingBounty && <div>
         <input type="radio" checked={addBountyType=="specific"} onClick={e=>setAddBountyType("specific")}/> Specific Person 
         <span style={{marginRight:'10px'}}> </span> 
         <input type="radio" checked={addBountyType=="broad"} onClick={e=>setAddBountyType("broad")}/> Broad Target 
        </div>}
       {(addingBounty && addBountyType=="specific") && <div>
         <input placeholder="First Name" value={addBountyData['fname']} onChange={e=>changeBountyData('fname',e.target.value)} type="text"/> <span style={{marginRight:'10px'}}/>
         <input placeholder="Last Name" value={addBountyData['lname']} onChange={e=>changeBountyData('lname',e.target.value)} type="text"/> <span style={{marginRight:'10px'}}/>
         <input placeholder="Company" type="text"  value={addBountyData['company']} onChange={e=>changeBountyData('company',e.target.value)}/> <span style={{marginRight:'10px'}}/>
         <input placeholder="Position" type="text" value={addBountyData['position']} onChange={e=>changeBountyData('position',e.target.value)}/><span style={{marginRight:'10px'}}/> <br/>
         <input type="text" placeholder="LinkedIn Link (Optional)" value={addBountyData['linkedin']} onChange={e=>changeBountyData('linkedin',e.target.value)} size="40"/> 
         <input type="text" placeholder="Email (Optional)" value={addBountyData['email']} onChange={e=>changeBountyData('email',e.target.value)} size="40"/> 
         <input type="text" placeholder="Phone (Optional)" value={addBountyData['phone']} onChange={e=>changeBountyData('phone',e.target.value)} size="40"/> 

         <center><Button variant="primary" onClick={e=>addBounty()}> Add </Button> </center>
        </div>}
       {(addingBounty && addBountyType=="person") && <div>
         <input placeholder="First Name" value={addFname} onChange={e=>setAddFname(e.target.value)} type="text"/> <span style={{marginRight:'10px'}}/>
         <input placeholder="Last Name" type="text"  value={addLname} onChange={e=>setAddLname(e.target.value)} /> <span style={{marginRight:'10px'}}/>
         <input placeholder="Company" type="text"  value={addCompany} onChange={e=>setAddCompany(e.target.value)}/> <span style={{marginRight:'10px'}}/>
         <input placeholder="Position" type="text" value={addPosition} onChange={e=>setAddPosition(e.target.value)}/><span style={{marginRight:'10px'}}/> <br/>
         <center><Button variant="primary" onClick={e=>addBounty()}> Add </Button> </center>
        </div>}
        
    </div>
  );
};

export default AddBountyWidget;
