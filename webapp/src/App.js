import React from 'react';
import './App.css';
import Login from './components/Login';
import { signOut } from "firebase/auth";
import Logo  from './assets/logofull.png';
import Logosm  from './assets/logowhite.png';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
 
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
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  pageChanged = (page) => {
    this.setState({page:page})
  }

  onLogin = async (user,auth,db, storage,firstLogin=false,userData={}) => {
    if(firstLogin){
      await setDoc(doc(db, "userData", user['uid']), userData);
    }
    const surveyRef = doc(db, 'surveyResults', user['uid']);
            const docSnap = await getDoc(surveyRef);
            if (docSnap.exists()) {
                this.setState({storedResponses:docSnap.data()});
            } 
    this.setState({user:user, auth:auth, db:db, storage:storage})
  }

  logout = () => {
    signOut(this.state['auth']).then(function() {
      this.setState({user:null})
      console.log('Signed Out');
    }, function(error) {
       console.error('Sign Out Error', error);
    });
 
  }


  render() {
    return (<div style={{width:"100%"}}>
      {this.state['user'] == null && <Login onLogin={this.onLogin} logout={this.logout}/>}
      <GlobalStyle/>
      {this.state['user'] && 
      (

      <div style={{fontFamily:'Plus Jakarta Sans',fontSize:'12pt'}}>
       <div className="sidebar" style={{width:this.state.mobile ? "100px" : "250px"}}>
      <center> <img src={this.state.mobile ? Logosm : Logo} width={this.state.mobile ? '50px' : '200px'} /> </center>
      <ul>
        <li>Home</li>
        <li>Matches</li>
        <li><a href="#event">Event Planner</a></li>
      </ul>
    </div>
       <div style={{width:'100vw',height:'100vh',marginTop:'25px'}}>
       <center>  <Questionnaire user={this.state.user} auth={this.state.auth} db={this.state.db} storage={this.state.storage}  mobile={this.state.mobile} storedResponses={this.state.storedResponses}/> </center>
       </div> 
     </div>)}
    </div>
    )
  }
}

export default App;
