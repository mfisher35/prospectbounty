import React from 'react';
import AppImages1 from '../assets/appImages1.png';
import Intro from '../assets/intro.png';
import Sharing from '../assets/sharing.png';
import Rewards from '../assets/rewards.png';
import SalesCycle from '../assets/salescycle.png';
import Membership from '../assets/membership.png';
import FindLeadsIcon from '../assets/findleads.png';
import MoneyBagIcon from '../assets/moneybag.png';
import TrophyIcon from '../assets/trophy.png';
import StarIcon from '../assets/star.png';

//import StepWidget from './components/StepWidget';

import '../App.css';

class WhatWhy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {whatText:[ 
      {
        text : "Find Sales Leads",
        image : FindLeadsIcon
      },
      { 
        text : "Introduce Leads For Rewards",
        image : MoneyBagIcon
      },
      { 
        text : "Tiered Rewards System",
        image : TrophyIcon
      },
      { 
        text : "Member Reputation Ratings",
        image : StarIcon
      },
      ],    
    

    whyText : "Propsect Bounty gets you high quality warm introductions to sales leads. It's easy to see the benefits:",
    
    box1Caption:"Shorten Your Sales Cycle",
    box1Text: "Warm intros can accelerate the sales process as skepticism is often reduced...your prospect is likely already pre-qualified and open to conversation.",

    box2Caption: "Introductions You Can Trust",
    box2Text: "Our members introductions are rated so you can verify that your bounty will be put to good use. No more mindless cold calling and rejections.",

    box3Caption : "Expand Your Contact List",  
    box3Text: "Make connections with prospects, overcome barriers. This can be particularly beneficial for individuals in new industries or have niche businessess.",


    box4Caption:"Supplemental Income",
    box4Text: "Earn rewards money by referring close contacts you have. Pre-qualify services they actually will want and help other sales representatives."

};
  }

  componentDidMount() {
   //
  }


  componentWillUnmount() {
  }


  render() {
    return (

   this.props.mobile ? 
 
    <div>
      <div style={{display:'block',paddingTop:'0px'}}> 
        <div style={{paddingTop:'40px',textAlign:'left'}}>
           <span style={{fontSize:'30px',fontWeight:'600',textAlign:'left'}}> What Is Prospect Bounty? </span> <br/> <br/><br/><br/>
           <span style={{color: '#686868',fontSize: '20px',fontWeight:'400',lineHeight:'30.7px'}}>
	    <div class="cool-list">
              {this.state.whatText.map(item => (<div style={{display:'flex',alignItems:'center'}}><img src={item['image']}/><li>{item['text']}</li></div>))}
	     </div>
            </span> 
        </div> <br/><br/>
        <div style={{}}>
          <center>  <img src={AppImages1} style={{objectFit:'contain',height:'60%',width:'60%'}}/>  </center>
        </div> <br/><br/><br/>
      </div> 
      <div style={{textAlign:'left',width:'100%',paddingBottom:'30px'}}>
      <span style={{fontSize:'30px',fontWeight:'600'}}> Why Friend Zone? </span> <br/> <br/>
       <span style={{color: '#686868',fontSize: '20px',fontWeight:'400',lineHeight:'30.7px'}}>
	    {this.state.whyText}
       </span>  
       </div> 
      <div style={{display:'block',justifyContent:'center'}}> 
          <center>
          <div class="whyboxmobile">
           <img src={SalesCycle} style={{objectFit:'contain',height:'90%',width:'100%'}}/>
           <span style={{fontSize:'20pt',fontWeight:'500'}}> {this.state.box1Caption} </span> <br/>
             <span style={{color:'#696969',fontSize:'16pt'}}>
                {this.state.box1Text} 
             </span>
          </div><br/>
          <div class="whyboxmobile">
           <img src={Intro} style={{objectFit:'contain',height:'90%',width:'100%'}}/>
           <span style={{fontSize:'20pt',fontWeight:'500'}}> {this.state.box2Caption}  </span> <br/>
           <span style={{color:'#696969',fontSize:'16pt'}}>
	    {this.state.box2Text}
           </span>
          </div> <br/>
          <div class="whyboxmobile">
           <img src={Membership} style={{objectFit:'contain',height:'90%',width:'100%'}}/>
           <span style={{fontSize:'20pt',fontWeight:'500'}}>  {this.state.box3Caption} </span> <br/>
             <span style={{color:'#696969',fontSize:'16pt'}}>
	      {this.state.box3Text}
             </span>
          </div> <br/>
          <div class="whyboxmobile">
           <img src={Rewards} style={{objectFit:'contain',height:'90%',width:'100%'}}/>
           <span style={{fontSize:'20pt',fontWeight:'500'}}>  {this.state.box4Caption}  </span> <br/>
           <span style={{color:'#696969',fontSize:'16pt'}}>
	    {this.state.box4Text}           </span>
          </div><br/>
          </center>
       </div>
     </div>
   
   :


    <div>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',maxWidth:'2400px',height:'1000px',paddingTop:'20px'}}>
        <div style={{flex:'4',paddingTop:'150px',textAlign:'left'}}>
         <span style={{fontSize:'55px',fontWeight:'600',textAlign:'left'}}> What Is Prospect Bounty? </span> <br/> <br/><br/><br/>
           <span style={{color: '#686868',fontSize: '27px',fontWeight:'400',lineHeight:'30.7px'}}>
	    <div class="cool-list">
              {this.state.whatText.map(item => (<div style={{display:'flex',alignItems:'center'}}><img src={item['image']}/>  <li>{item['text']}</li></div>))}
	     </div>

     
          </span> 
        </div>
        <div style={{flex:'1'}}/>
        <div style={{flex:'3',justifyContent:'right',textAlign:'right',borderRadius:"20%"}}>
             <div style={{flexDirection:'col',alignItems:'center',justifyContent:'center',height:'100%'}}>
                <img src={AppImages1} style={{objectFit:'contain',height:'100%',width:'100%',borderRadius:'10%'}}/> 
           </div>
        </div>
      </div>
      <div style={{textAlign:'left',width:'100%',paddingBottom:'30px',marginTop:'40px'}}>
      <span style={{fontSize:'56px',fontWeight:'600'}}> Why Prospect Bounty? </span> <br/> <br/>
       <span style={{color: '#686868',fontSize: '27px',fontWeight:'400',lineHeight:'30.7px'}}>
        {this.state.whyText}
       </span>  
       </div>
      <div style={{width:'100%',flexWrap:'wrap',display:'flex',justifyContent:'center'}}> 
          <div class="whybox">
           <img src={SalesCycle} style={{objectFit:'contain',height:'90%',width:'100%'}}/>
           <span style={{fontSize:'25pt',fontWeight:'500'}}>  {this.state.box1Caption} </span> <br/>
             <span style={{color:'#696969',fontSize:'20pt'}}>
              {this.state.box1Text} 
             </span>
          </div>
          <div style={{flex:1}}> </div>
          <div class="whybox">
           <img src={Intro} style={{objectFit:'contain',height:'90%',width:'100%'}}/>
           <span style={{fontSize:'25pt',fontWeight:'500'}}>  {this.state.box2Caption}  </span> <br/>
           <span style={{color:'#696969',fontSize:'20pt'}}> 
           {this.state.box2Text}
           </span>
          </div>
      </div> <br/><br/><br/>
       <div style={{width:'100%',flexWrap:'wrap',display:'flex',justifyContent:'center'}}> 
          <div class="whybox">
           <img src={Membership} style={{objectFit:'contain',height:'90%',width:'100%'}}/>
           <span style={{fontSize:'25pt',fontWeight:'500'}}>  {this.state.box3Caption} </span> <br/>
             <span style={{color:'#696969',fontSize:'20pt'}}> {this.state.box3Text}
             </span>
          </div>
          <div style={{flex:1}}> </div>
          <div class="whybox">
           <img src={Rewards} style={{objectFit:'contain',height:'90%',width:'100%'}}/>
           <span style={{fontSize:'25pt',fontWeight:'500'}}>  {this.state.box4Caption}  </span> <br/>
           <span style={{color:'#696969',fontSize:'20pt'}}>
           {this.state.box4Text}
           </span>
          </div>
      </div>

     </div>
    )
  }
}

export default WhatWhy;
