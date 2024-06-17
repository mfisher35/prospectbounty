import React from 'react';
import './App.css';
import { Fade } from "react-awesome-reveal";
import Header from './components/Header';
import WhatWhy from './components/WhatWhy';
import Signup from './components/Signup'; 
import StepWidget from './components/StepWidget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mobile:window.innerWidth <= 768,page:'main'};
    this.pageChanged = this.pageChanged.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  pageChanged = (page) => {
    this.setState({page:page})
  }

  render() {
    return (<div style={{width:"100%",height:"100%"}}>
      {this.state.page == "signup" && (<Signup/>)}
      {this.state.page == "main" && 
      (<div style={{fontFamily:'Plus Jakarta Sans'}}>
       <div style={{width:'100vw'}}>
        <Header mobile={this.state.mobile} pageChanged={this.pageChanged}/> 
       </div> 
       <div style={{paddingLeft:'7%',paddingRight:'7%'}}>
            <Fade duration="1500"> <WhatWhy mobile={this.state.mobile}/> </Fade>
       </div> 
     </div>)}
    </div>
    )
  }
}

export default App;
