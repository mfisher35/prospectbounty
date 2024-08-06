import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { where, query, doc, getDocs, getDoc, collection, setDoc, addDoc, getFirestore } from "firebase/firestore";
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import Payment from './Payment';
import {createBountyAPI} from './APIHelpers';
import {states, orgTypes, industryTypes, lowerAll} from './Helpers';
const AddBountyWidget = ({user, auth, db, userData, setUserData, bounties, setBounties, mobile, setAddingBounty, stripe, onBack}) => {
  const currentDate = new Date().toDateString();

  const [page, setPage] = useState('home')
  const [addBountyType, setAddBountyType] = useState(null);
  const [addBountyData, setAddBountyData] = useState({posterId:user.uid, posterUsername :userData['username'], postDate: currentDate});
  const [paymentError, setPaymentError] = useState("");
 
  const addBounty = async (paymentData) => {
   addBountyData['posterId'] = user['uid'];
   addBountyData['posterUsername'] = userData['username'];
   addBountyData['createDate'] = (new Date()).toISOString();
   addBountyData['amount'] = paymentData['amount']/100.0;
   addBountyData['paymentData'] = paymentData;
   //let newBounty = await addDoc(collection(db, "bountyList"), addBountyData);
   try {
      let result = await createBountyAPI(user,lowerAll(addBountyData));
      if(result['result'] == 'success'){
        let lbounties = [...bounties];
        lbounties.push(addBountyData);
        setBounties(lbounties);
        clearBounty();
        return true;
      }
      else{ setPaymentError(result['error'])}
   }
   catch(e){setPaymentError(e.toString()); return false;}
    return false;
  }
  
   const goToDescription = async () => {    
     setAddingBounty(true);
     const bountiesRef = collection(db, "bountyList");
     const q = query(bountiesRef, where("posterId", "==", user.uid));
     let description = "";
     let querySnapshot = await getDocs(q);
     if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
             let docData = doc.data();
            description = docData['description']
          });
     }
     setAddBountyData({description});
     setPage("description")
  }
  const startPayment = () => {

  }
  const onPaymentSuccess = async (paymentData) => {
    console.log('payment success');
    try{
       if(await addBounty(paymentData))
       setPage('finished')
    }
    catch(e) {console.log(e);}
  }

  const onPaymentFail = (error) => {
    setPaymentError(error);
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

    {page != "home" && <div style={{width:'fit-content',backgroundColor:'#ddd',borderRadius:'20px',border:'1px solid #ccc',marginBottom:'20px'}} onClick={e=>{setPage("home"); onBack()}}> <ArrowBackIcon/> </div> }
       {page=="home" && <Button primary onClick={e=>goToDescription()}> + Add Bounty </Button>}
       {page=="description" && <div><br/> 
           <input placeholder="Bounty Name" value={addBountyData['bountyName']} onChange={e=>changeBountyData('bountyName',e.target.value)} type="text" size="25"/> <br/><br/>
           Enter Description of Your Product/Service: <br/><br/>
           <textarea rows="10" cols="30" placeholder="Brief Background of You, Your Service/Offering" value={addBountyData['description']} onChange={e=>changeBountyData('description',e.target.value)} type="text" size="500"/> <br/><br/>
           <Button onClick={e=>setPage("details")}> Continue </Button> </div>}
       {page=="details" && <div>
         <h5> Bounty Target Info </h5>
         <input type="radio" checked={addBountyType=="specific"} onClick={e=>setAddBountyType("specific")}/> Specific Person 
         <span style={{marginRight:'10px'}}> </span> 
         <input type="radio" checked={addBountyType=="broad"} onClick={e=>setAddBountyType("broad")}/> Broad Target 
        </div>}
       {(page =="details" && addBountyType=="specific") && <div>
         <input size="22" placeholder="Full Name" value={addBountyData['fullname']} onChange={e=>changeBountyData('fullname',e.target.value)} type="text"/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}

         <input size="22" placeholder="Organization" type="text"  value={addBountyData['organization']} onChange={e=>changeBountyData('organization',e.target.value)}/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}
        
         {orgTypes(addBountyData['organizationType'],changeBountyData)}  <span style={{marginLeft:'5px'}}> </span>

         {industryTypes(addBountyData['industryType'],changeBountyData)}  <br/><br/>
         <input size="22" placeholder="Position" type="text" value={addBountyData['position']} onChange={e=>changeBountyData('position',e.target.value)}/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>} <br/>
         <input size="22" placeholder="City" type="text" value={addBountyData['city']} onChange={e=>changeBountyData('city',e.target.value)}/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}
          {states(addBountyData['state'],changeBountyData)}<br/>
         <input size="22" type="text" placeholder="LinkedIn Link (Optional)" value={addBountyData['linkedin']} onChange={e=>changeBountyData('linkedin',e.target.value)} /> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>} 
         <input size="22" type="text" placeholder="Email (Optional)" value={addBountyData['email']} onChange={e=>changeBountyData('email',e.target.value)} />{mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>} 
         <input size="22" type="text" placeholder="Phone (Optional)" value={addBountyData['phone']} onChange={e=>changeBountyData('phone',e.target.value)}/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}

         <center><Button variant="primary" onClick={e=>setPage("payment")}> Continue </Button> </center>
        </div>}
       {(page=="details" && addBountyType=="broad") && <div>
         {orgTypes(addBountyData['organizationType'],changeBountyData)}  <span style={{marginLeft:'5px'}}> </span>
         {industryTypes(addBountyData['industryType'],changeBountyData)}  <br/><br/>
         <textarea rows="10" cols="30" placeholder="Please Add More Details About the Target Audience" type="text" value={addBountyData['targetDescr']} onChange={e=>changeBountyData('targetDescr',e.target.value)}/><span style={{marginRight:'10px'}}/> <br/>

         <center><Button variant="primary" onClick={e=>setPage("payment")}> Continue </Button> </center>
        </div>
       }
       {page=="payment" && <div>
         
            <Payment userData={userData} user={user} auth={auth} setUserData={setUserData} stripe={stripe} onPaymentSuccess={onPaymentSuccess} onPaymentFail={onPaymentFail}/>
 
    </div>} 
     {page=="finished" && <div>
       <CheckCircleIcon style={{color:'green',fontSize:'100pt'}}/>  <br/> <br/>
         <span> Bounty Submitted! </span> <br/><br/>
         <Button onClick={e=>{goToDescription()}}> <AddIcon fontSize="small" style={{marginBottom:'3px',marginRight:'2px'}} /> Add Another Bounty </Button> <br/><br/> 
    </div>}
   
    </div>
  );
};

export default AddBountyWidget;
