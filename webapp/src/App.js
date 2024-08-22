import React from 'react';
import './App.css';
import Login from './components/Login';
import { signOut } from "firebase/auth";
import Logo  from './assets/logofull.png';
import Logosm  from './assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import styled, { createGlobalStyle } from 'styled-components';
import Home from './components/Home';
import HunterInit from './components/HunterInit';
 
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mobile:window.innerWidth <= 768,page:'main', user:null, storedResponses:{}};
    this.pageChanged = this.pageChanged.bind(this);
    this.setUserData = this.setUserData.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  pageChanged = (page) => {
    this.setState({page:page})
  }

  onLogin = async (user,auth,db, storage) => {

     let userDataSnap = await getDoc(doc(db, 'userData', user['uid']));
     let userData = userDataSnap.data();
     let stripe = Stripe('pk_test_51OdzI1Alm1HQFLjrcSvj9WILA3ZFY4iXYlGweR4VV8f8UI6aFgDOKHHVOMulInw0eW58XEIJ95xjUG1Za9MeMeQp00HyjV5P2w');

     if(userData['phoneVerified'])
       this.setState({user, auth, db, storage, userData, stripe:stripe})
  }

  setUserData = (userData) => {
     this.setState({'userData' : userData})
  }

  logout = () => {
   signOut(this.state['auth']).then(e=>{
      this.setState({user:null,userData:null})
      console.log('Signed Out');
    }, function(error) {
       console.error('Sign Out Error', error);
    });
 
  }

  

  render() {
    return (<div style={{width:"100%"}}>
      {this.state['user'] == null && <Login onLogin={this.onLogin} logout={this.logout}/>}
      <GlobalStyle/>

      {(!this.state.userData?.closeContacts && this.state.userData?.role == 'hunter') && <HunterInit user={this.state.user} auth={this.state.auth} db={this.state.db} storage={this.state.storage}  mobile={this.state.mobile} userData={this.state.userData} setUserData={this.setUserData}/>}

      {(this.state.userData?.role == 'poster' || this.state.userData?.closeContacts) && 
        <Home user={this.state.user} auth={this.state.auth} db={this.state.db} storage={this.state.storage}  mobile={this.state.mobile} userData={this.state.userData} setUserData={this.setUserData} stripe={this.state.stripe} logout={this.logout}/> }
    </div>
    )
  }
}

export default App;
