import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { doc, getDoc, collection, setDoc, addDoc, getFirestore } from "firebase/firestore";
import Checkmark from '../assets/checkmark.png'

const AddBountyWidget = ({user, auth, db, userData, bounties, setBounties, mobile}) => {
  const currentDate = new Date().toDateString();

  const [page, setPage] = useState('home')
  const [addBountyType, setAddBountyType] = useState(null);
  const [addBountyData, setAddBountyData] = useState({posterId:user.uid, posterName : userData['name'], postDate: currentDate});

  const addBounty = async () => {

   addBountyData['posterId'] = user['uid'];
   await addDoc(collection(db, "bountyList"), addBountyData);
   let lbounties = [...bounties];
   lbounties.push(addBountyData);
   setBounties(lbounties);
   clearBounty();
  }

  const clearBounty = () => {
    setAddBountyType(null);
    setPage('finished');
    setAddBountyData({});
  }

  const changeBountyData = (field, text) => {
     let newBData = {...addBountyData};
     if(field == 'amount'){
       if(/[0-9]+$/.test(text) || text=="")
         newBData[field] = text;
     }
     else
      newBData[field] = text;
     console.log(newBData)
     setAddBountyData(newBData);
  }
 
  const unroll = (item) => {
   let result = "";
   Object.keys(item).filter(tkey=>['description','phone'].indexOf(tkey) < 0).forEach((key,ix)=> result=result+" - "+item[key])
   return result.substring(2,result.length);
  }


  return (
    <div style={{width:mobile ? '200px':'500px'}}>
       {/*bounties.length > 0 && 
         bounties.map((item,index) => (<> <span style={{padding:'10px',borderRadius:'15px',backgroundColor:'#d4d2c1'}}> {unroll(item)} </span><div style={{marginBottom:'30px'}}/></>))*/
       }

       {page=="home" && <Button primary onClick={e=>setPage("description")}> + Add Bounty </Button>}
       {page=="description" && <div><br/> 
           <input placeholder="Bounty Name" value={addBountyData['bountyName']} onChange={e=>changeBountyData('bountyName',e.target.value)} type="text" size="25"/> <br/><br/>
           Enter an Overview of Your Bounty <br/><br/>
           <textarea rows="10" cols="30" placeholder="Brief Background of Your Offering and Target" value={addBountyData['description']} onChange={e=>changeBountyData('description',e.target.value)} type="text" size="500"/> <br/><br/>
           <Button onClick={e=>setPage("details")}> Continue </Button> </div>}
       {page=="details" && <div>
         <input type="radio" checked={addBountyType=="specific"} onClick={e=>setAddBountyType("specific")}/> Specific Person 
         <span style={{marginRight:'10px'}}> </span> 
         <input type="radio" checked={addBountyType=="broad"} onClick={e=>setAddBountyType("broad")}/> Broad Target 
        </div>}
       {(page =="details" && addBountyType=="specific") && <div>
         <input size="22" placeholder="First Name" value={addBountyData['fname']} onChange={e=>changeBountyData('fname',e.target.value)} type="text"/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}
         <input size="22" placeholder="Last Name" value={addBountyData['lname']} onChange={e=>changeBountyData('lname',e.target.value)} type="text"/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}

         <input size="22" placeholder="Company" type="text"  value={addBountyData['company']} onChange={e=>changeBountyData('company',e.target.value)}/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}

         <input size="22" placeholder="Position" type="text" value={addBountyData['position']} onChange={e=>changeBountyData('position',e.target.value)}/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}
 
         <input size="22" type="text" placeholder="LinkedIn Link (Optional)" value={addBountyData['linkedin']} onChange={e=>changeBountyData('linkedin',e.target.value)} /> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}
         <input size="22" type="text" placeholder="Email (Optional)" value={addBountyData['email']} onChange={e=>changeBountyData('email',e.target.value)} />{mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>} 
         <input size="22" type="text" placeholder="Phone (Optional)" value={addBountyData['phone']} onChange={e=>changeBountyData('phone',e.target.value)}/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}

         <center><Button variant="primary" onClick={e=>setPage("payment")}> Continue </Button> </center>
        </div>}
       {(page=="details" && addBountyType=="broad") && <div>
         <textarea rows="10" cols="30" placeholder="Please Add More Details About the Target Audience" type="text" value={addBountyData['targetDescr']} onChange={e=>changeBountyData('targetDescr',e.target.value)}/><span style={{marginRight:'10px'}}/> <br/>
         <center><Button variant="primary" onClick={e=>setPage("payment")}> Continue </Button> </center>
        </div>}
       {page=="payment" && <div>
         $ <input type="text" placeholder="Bounty Amount" type="text" value={addBountyData['amount']} onChange={e=>changeBountyData('amount',e.target.value)}/><span style={{marginRight:'10px'}}/> <br/>
         <div style={{width:mobile ? "300px": '500px',height:'300px',backgroundColor:'gray'}}> CC PAYMENT GOES HERE TBD </div> 
         <div style={{marginBottom:'15px'}}> <span style={{fontSize:'10pt'}}> The Card Will Be Charged And The Money Will Be Held In Escrow </span></div>
         <center> <Button variant="primary" onClick={e=>addBounty()}>  Submit Bounty </Button> </center>
    </div>}
     {page=="finished" && <div>
       <img src={Checkmark} width="150px"/> <br/> <br/>
         <span> Bounty Submitted! </span>
    </div>}
   
    </div>
  );
};

export default AddBountyWidget;
