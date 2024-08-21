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
  const [addBountyType, setAddBountyType] = useState("specific");
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
  const splitStyle = {display:'flex',flexGrow:'1',flexDirection:'column',width:'45%'};

  const unroll = (item) => {
   let result = "";
   Object.keys(item).filter(tkey=>['description','phone'].indexOf(tkey) < 0).forEach((key,ix)=> result=result+" - "+item[key])
   return result.substring(2,result.length);
  }

  const getTitle = () => {
    if (page == "details")
      return ": Target Details"
    return "";
  }

  const required = () => {
    return <span style={{color:'red'}}> *</span>
  }

  return (<div style={{padding:"10px 30px",textAlign:'left'}}>

    {page != "home" && <div>
        
       <div style={{fontSize:'30px',fontWeight:'600'}}> {"New Bounty" + getTitle()} </div> 
        <div style={{width:'100%',textAlign:'left',width:'fit-content',backgroundColor:'#ddd',borderRadius:'20px',border:'1px solid #ccc',marginBottom:'20px'}} onClick={e=>{setPage("home"); onBack()}}> <ArrowBackIcon/> 
        </div> </div>}
   <center> <div style={{width:mobile ? '200px':'500px'}}>

       {page=="home" && 
         <div className="bounty-assign-btn" onClick={e=>goToDescription()}> <AddIcon style={{border:'1px solid black',borderRadius:'20px',color:'black',marginRight:'4px',marginBottom:'3px'}}/> Add Bounty  </div>}
       {page=="description" && <div className="cardcontainer" style={{textAlign:'left'}}><br/> 

           <div style={{... splitStyle, width:'80%'}}>
            Bounty Name: <br/>
            <input placeholder="Bounty Name" value={addBountyData['bountyName']} onChange={e=>changeBountyData('bountyName',e.target.value)} type="text" size="25"/> 
           </div>

           <div style={{... splitStyle, width:'80%'}}>
            Description of Your Product/Service: <br/>
           <textarea style={{padding:'7px',height:'250px'}} placeholder="Brief Background of You, Your Service/Offering" value={addBountyData['description']} onChange={e=>changeBountyData('description',e.target.value)} type="text" size="500"/> <br/><br/>
           </div>


           <Button className="bounty-assign-btn" onClick={e=>setPage("details")}> Continue </Button> </div>}
       {page=="details" && <div className="cardcontainer" style={{margin:'0px',padding:'10px',maxWidth:'none',width:'fit-content'}} > 
           
            <div style={{display:'flex',width:'100%',margin:'0px',padding:'10px',flexDirection:'row',justifyContent:'space-between'}}>

               <div onClick={e=>setAddBountyType("specific")} style={{borderRadius:'12px 0px 0px 12px',border:'1px solid #e9e9e9',padding:'10px',flexGrow:'1',textAlign:'center',backgroundColor: addBountyType == 'specific' ? '#dfbb81':' white',cursor:'pointer'}}> Specific Person 
              </div>
              <div onClick={e=>setAddBountyType("broad")} style={{borderRadius:'0px 12px 12px 0px',cursor:'pointer',padding:'10px',border:'1px solid #e9e9e9',flexGrow:'1',textAlign:'center',backgroundColor: addBountyType == 'broad' ? '#dfbb81':' white'}}> 
                Broad Target
              </div>
       </div> 
       {(addBountyType=="specific") && <div style={{padding:'8px 25px 25px 25px',textAlign:'left',fontSize:'11pt',fontWeight:'bold'}}>
          Full Name<br/>
         <input style={{width:'100%'}} placeholder="Full Name" value={addBountyData['fullname']} onChange={e=>changeBountyData('fullname',e.target.value)} type="text"/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}
          Organization<br/>
         <input style={{width:'100%'}} placeholder="Organization" type="text"  value={addBountyData['organization']} onChange={e=>changeBountyData('organization',e.target.value)}/> {mobile ? <br/> : <span style={{marginLeft:'5px'}}> </span>}
        <div style={{display:'flex',flexDirection:'row'}}> 
           <div style={splitStyle}>
            Organization Type: <br/>
            {orgTypes(addBountyData['organizationType'],changeBountyData)}  <span style={{marginLeft:'5px'}}> </span>
           </div>
           <div style={{width:'20px'}}/> 
           <div style={splitStyle}>
            Industry Type <br/>
            {industryTypes(addBountyData['industryType'],changeBountyData)}  <br/>         </div>
        </div>

        <div style={{display:'flex',flexDirection:'row'}}> 
           <div style={splitStyle}>
             Position<br/>
             <input placeholder="Position" type="text" value={addBountyData['position']} onChange={e=>changeBountyData('position',e.target.value)}/> 
           </div>
           <div style={{width:'20px'}}/> 
           <div style={splitStyle}>
              Linkedin Link<br/>
             <input type="text" placeholder="Linkedin Link" value={addBountyData['linkedin']} onChange={e=>changeBountyData('linkedin',e.target.value)} />  
           </div>
          </div>
        
         <div style={{display:'flex',flexDirection:'row'}}> 
           <div style={splitStyle}>
              City<br/>
              <input placeholder="City" type="text" value={addBountyData['city']} onChange={e=>changeBountyData('city',e.target.value)}/> 
           </div>
           <div style={{width:'20px'}}/> 
           <div style={splitStyle}>
             State<br/>
             {states(addBountyData['state'],changeBountyData)}<br/>
         </div>
        </div>

        <div style={{display:'flex',flexDirection:'row'}}> 
           <div style={splitStyle}>
              EMail<br/>
              <input type="text" placeholder="Email" value={addBountyData['email']} onChange={e=>changeBountyData('email',e.target.value)} />
           </div>
           <div style={{width:'20px'}}/> 
           <div style={splitStyle}>
             Phone<br/>
             <input type="text" placeholder="Phone" value={addBountyData['phone']} onChange={e=>changeBountyData('phone',e.target.value)}/> 
          </div>
        </div>
      <br/><div style={{width:'100%',textAlign:'right'}}>  <Button style={{padding:'12px'}} className="bounty-assign-btn" onClick={e=>setPage("payment")}> <b> Continue </b> </Button> </div>
        </div>}
       {(addBountyType=="broad") && <div style={{padding:'8px 25px 25px 25px',textAlign:'left',fontSize:'11pt',fontWeight:'bold'}}>
 
        <div style={{display:'flex',flexDirection:'row'}}> 
           <div style={splitStyle}>
             Organization Type
             {orgTypes(addBountyData['organizationType'],changeBountyData)}  
           </div>
             <div style={{width:'20px'}}/> 
           <div style={splitStyle}>
            Industry Type
           {industryTypes(addBountyData['industryType'],changeBountyData)}  <br/><br/>     </div>
       </div>
         <textarea style={{width:'100%',height:'250px',padding:'7px'}} placeholder="Please Add More Details About the Target Audience" type="text" value={addBountyData['targetDescr']} onChange={e=>changeBountyData('targetDescr',e.target.value)}/><span style={{marginRight:'10px'}}/> <br/>

         <div style={{width:'100%',textAlign:'right'}}> <Button className="bounty-assign-btn" style={{padding:'12px',fontWeight:'bold'}} onClick={e=>setPage("payment")}> Continue </Button> </div>
        </div>
       }
       </div>}
       {page=="payment" && <div>
         
            <Payment userData={userData} user={user} auth={auth} setUserData={setUserData} stripe={stripe} onPaymentSuccess={onPaymentSuccess} onPaymentFail={onPaymentFail}/>
 
    </div>} 
     {page=="finished" && <div>
       <CheckCircleIcon style={{color:'green',fontSize:'100pt'}}/>  <br/> <br/>
         <span> Bounty Submitted! </span> <br/><br/>
         <Button onClick={e=>{goToDescription()}}> <AddIcon fontSize="small" style={{marginBottom:'3px',marginRight:'2px'}} /> Add Another Bounty </Button> <br/><br/> 
    </div>}
   
    </div> </center>
 </div> );
};

export default AddBountyWidget;
