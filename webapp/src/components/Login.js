import React, { useState } from 'react';

import styled from 'styled-components';
import Logo from '../assets/logofull.png';
import Spinner from 'react-bootstrap/Spinner';
import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { sendEmailVerification, getAuth, linkWithPhoneNumber, signInWithPhoneNumber, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import EmailPhoneVerification from './EmailPhoneVerification';
import { getStorage, ref, uploadBytes } from "firebase/storage";

const tosLink = "https://prospectbounty.com/legal/terms.html";

const firebaseConfig = {
  apiKey: "AIzaSyAvUpWGDQnIH7xmWuwPfBdhOw0rPr8H3Tc",
  authDomain: "prospectbounty.firebaseapp.com",
  projectId: "prospectbounty",
  storageBucket: "prospectbounty.appspot.com",
  messagingSenderId: "179623368669",
  appId: "1:179623368669:web:1a2ad418767e1294140834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
 
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /Going To Haveheight: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  width:400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-top: 0.5rem;
  text-decoration: underline;

  &:hover {
    color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

const Login = ({onLogin}) => {
  const [accepted, setAccepted] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState("home");
  const [userData, setUserData] = useState(null);

  const tosLink = "https://prospectbounty.com/legal/terms.html";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
         setLoggingIn(true);
         setError(null);
         let creds = await signInWithEmailAndPassword(auth,email, password);
         setUser(creds['user']);
         setLoggingIn(false);
         let userInfo = await getDoc(doc(db, "userData", creds['user']['uid']));
         setUserData(userInfo.data());
         console.log('userInfo',userInfo.data());
       } catch (error) {
         setError(error.message);
         setLoggingIn(false);
       }
  }

  const cleanError = (error) => {
     let result = error;
     let cleans = ["Firebase",":","(","auth",")","."];
     let spaces = ["/","-"]
     for (let i=0; i< cleans.length;i++)
        result = result.replaceAll(cleans[i],"");
     for (let i=0; i< spaces.length;i++)
        result = result.replaceAll(spaces[i]," ");
     return result;
  }
  const handleRegistering = async (e) => {
    e.preventDefault();
    setError(null);
    setRegistering(!registering);
  };

  const phoneTextChange = (newText) => {
        if((/[0-9]+$/.test(newText) || newText=="") && newText.length<=10) 
          setPhone(newText)
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if(phone.length < 10)
        throw new Error('Phone Number Must Be 10 Digits!');
      setError(null);
      console.log(auth,email,password);
      await createUserWithEmailAndPassword(auth, email, password)
      let creds = await signInWithEmailAndPassword(auth,email, password);
      await sendEmailVerification(auth.currentUser);
      let newUserData = {name:name,phone:phone,phoneVerified:false};
      await setDoc(doc(db, "userData", creds['user']['uid']), newUserData);
      setUserData(newUserData);
      setUser(creds['user']);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error) {
      setError(error.message);
    }
  };
  
  if(userData)
    if (user && (!user.emailVerified || !userData['phoneVerified'])) {
      return <EmailPhoneVerification name={name} user={user} auth={auth} storage={storage} db={db} onLogin={onLogin} email={email} password={password} userData={userData}/>;
  }

  if(userData)
    if (user && user.emailVerified && userData['phoneVerified']){
      onLogin(user,auth,db,storage)
  }
  return (
    <Container>
      <div style={{marginBottom:'30px',marginTop:'50px'}}> <center> <img src={Logo} width='290px'/> </center></div>
      <Form onSubmit={registering ? handleRegister : handleLogin}>
        <h2>{registering ? "Register" : "Login"}</h2>
{registering &&  (<><Input
          type="text"
          placeholder="First Name / Nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="10 Digit Phone Number"
          value={phone}
          onChange={(e) => phoneTextChange(e.target.value)}
          required
        />

       </> )}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {registering && <div> 
        <Input
          onClick={e=>setAccepted(!accepted)}
          type="checkbox"
          checked={accepted}
          required
        /> I Accept The <a href={tosLink} target="_blank"> Terms & Conditions </a>
        </div>}
        {error && <ErrorMessage>{cleanError(error)}</ErrorMessage>}
	{loggingIn ?     (<center> <Spinner animation="border" variant="primary" /> </center>)  : <Button type="submit">{registering ? "Register" : "Login"} </Button>}
        <LinkButton onClick={handleRegistering}>{registering ? "Login" : "Register"}</LinkButton>
        <LinkButton onClick={handleForgotPassword}>Forgot Password</LinkButton>
      </Form>
    </Container>
  );
};

export default Login;
