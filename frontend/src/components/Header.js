import React from 'react';
import LogoWhite from '../assets/logowhite.png'
import '../App.css';
import BGimage from '../assets/image-header.jpg'
import fztext from '../assets/logotext.png'
import {Button} from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (

   this.props.mobile  ?     <div class="video-container" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
     <div class="video-container">
        <img id="BGI" src={BGimage} height="100%" width="100%"/>
    <div class="caption">
      <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column',alignItems:'stretch',height:'773px'}}>
        <div style={{flex:'1',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <div style={{flex:1,justifyContent:'left',textAlign:'left',paddingLeft:'10px'}}>
             <a href="https://www.prospectbounty.com"> <img src={LogoWhite} width='120px'/> </a>
           </div> 
           <div style={{flex:'1',paddingRight:'20px',textAlign:'right'}}>
          <a href="https://prospectbounty.web.app">   <div class="download-button" onClick={e=>{}}> Sign Up / Login</div> </a>
           </div>      
        </div> 
        <div style={{flex:'1',width:'100%'}}> 
           <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <div style={{flex:'1'}}>
              
              </div>
              <div style={{flex:'6',textAlign: 'center',fontFamily: 'Helvetica',fontSize: '26px',fontWeight: '400',lineHeight:'130%',margin:'auto'	}}>
<img src={fztext} width="300px"/>
              </div>
              <div style={{flex:'1',textAlign:'right',margin:'15px'}}>
                 <span class="scroll-down-text" style={{writingMode: 'vertical-rl',maxHeight:'350px',maxWidth:'20px',fontSize:'12px'}}>
                   SCROLL DOWN
                 </span>
              </div>
           </div>
        <a href="https://prospectbounty.web.app"> <Button variant="success" size="lg" onClick={e=>{}}> Sign Up / Login </Button> </a> <br/>
        </div>
        <div style={{flex:'1',marginTop:'70px',paddingBottom:'10px',textAlign:'center'}}>  <span id="shadow"> Sign Up Now To Find or Give Leads For Rewards! </span> </div>
    </div> 
    </div>
</div>        
    </div> 

   :

    <div class="video-container" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
     <div class="video-container">
        <img id="BGI" src={BGimage} width="100%" height="100%"/>
    <div class="caption">
      <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column',alignItems:'stretch',height:'773px'}}>
        <div style={{flex:'1',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <div style={{flex:1,justifyContent:'left',textAlign:'left',paddingLeft:'10px'}}>
             <a href="https://www.prospectbounty.com"> <img src={LogoWhite} width='120px'/> </a>
           </div> 
           <div style={{flex:'1',paddingRight:'20px',textAlign:'right'}}>
         <a href="https://prospectbounty.web.app">    <div class="download-button" onClick={e=>{}}> Sign Up / Login </div></a>
           </div>      
        </div> 
        <div style={{flex:'1',width:'100%'}}> 
           <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <div style={{flex:'1'}}>
              
              </div>
              <div style={{flex:'6',textAlign: 'center',fontFamily: 'Helvetica',fontSize: '56px',fontWeight: '400',lineHeight:'130%',margin:'auto'	}}>
<img src={fztext} width="900px"/>
              </div>
              <div style={{flex:'1',textAlign:'right',margin:'15px'}}>
                 <span class="scroll-down-text" style={{writingMode: 'vertical-rl',maxHeight:'350px',maxWidth:'20px'}}>
                   SCROLL DOWN
                 </span>
              </div>
           </div>
<a href="https://prospectbounty.web.app"> <Button variant="success" size="lg" onClick={e=>{this.props.pageChanged("signup")}}> Sign Up </Button> </a> <br/>
        </div>
        <div style={{flex:'1',marginTop:'70px',paddingBottom:'10px',textAlign:'center'}}>  <span id="shadow"> Sign Up Now To Find or Give Leads For Rewards! </span> </div>
    </div> 
    </div>
</div>        
    </div> 
    )
  }
}

export default Header;
