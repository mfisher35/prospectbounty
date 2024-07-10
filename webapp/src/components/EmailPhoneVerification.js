import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmailImg from '../assets/email.png';
import { signInWithEmailAndPassword, signInWithPhoneNumber, sendEmailVerification, RecaptchaVerifier } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import Logo  from '../assets/logofull.png';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Message = styled.p`
  margin-bottom: 1rem;
  padding-left:50px;
  padding-right:50px;
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

const EmailPhoneVerification = ({ name, user, auth, storage, db, onLogin, userData, email, password }) => {
  const [emailVerified, setEmailVerified] = useState(user.emailVerified);
  const [initialEmailSent, setInitialEmailSent] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneConfirmationResult, setPhoneConfirmationResult] = useState(null);
  const [userPhoneCode, setUserPhoneCode] = useState("");
  const [error, setError]  = useState("");
  const [captchaInit, setCaptchaInit] = useState(false)
  useEffect(() => {
    try {
       if(!captchaInit){
         setCaptchaInit(true);
         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });}} catch(e) {console.log(e)}
  }, []);

  useEffect(() => {
    const checkEmailVerification = setInterval(async () => {
      await user.reload();
      const currentUser = auth.currentUser;
      if (currentUser.emailVerified) {
        setEmailVerified(true);
        verifyPhone();
        clearInterval(checkEmailVerification);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(checkEmailVerification);
  }, [user]);

  const sendVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      alert('Verification email sent!');
    } catch (error) {
      alert(error.message);
    }
  };

  if (emailVerified && phoneVerified) {
    onLogin(user,auth,db, storage);
  }


const verifyPhone = () => {
    const appVerifier = window.recaptchaVerifier;
    try{
    signInWithPhoneNumber(auth,`+1${userData['phone']}`, appVerifier).then((confirmationResult) => {
        setPhoneConfirmationResult(confirmationResult);
      })
    }
     catch(error) { setError(cleanError(error.message))}
    }

const handleVerifyCode = async ()  => {
        let newUserData = userData;
        phoneConfirmationResult.confirm(userPhoneCode)
          .then(async (result) => {
            newUserData['phoneVerified'] = true;
            let creds = await signInWithEmailAndPassword(auth,email, password);
            await setDoc(doc(db, "userData", user['uid']), newUserData);
            setPhoneVerified(true);
          })
          .catch((error) => {
            console.error("Error during confirmation", error);
            setError(cleanError(error.message));
          });
  }

  return (
    <Container style={{padding:'40px'}}>
      <center> <img src={Logo} width="300px" /></center> <br/><br/>
      {!emailVerified && <>  <center> <img src={EmailImg} width="180px" /> </center> <br/><br/>
           <Message> Please Check Your E-Mail And Click The Link To Verify Your Account </Message>
        <center> <Button onClick={sendVerificationEmail}>Resend Verification Email</Button> </center> </> }
      {emailVerified && <div style={{borderRadius:'15px',backgroundColor:'#dedede' ,padding:'50px'}}>  <center>✅ ✉️  E-Mail Verified. </center> </div> }
      {phoneConfirmationResult && (<div style={{borderRadius:'15px',backgroundColor:'#dedede' ,padding:'20px',marginTop:'30px',width:"100%"}}>
        <center> <span> SMS Code Sent To: {userData['phone']}</span> <br/> <span> Enter Phone Verification Code: </span><br/>
        <input type="text" value={userPhoneCode} onChange={e=>{setUserPhoneCode(e.target.value)}}/> <br/><br/>
        <Button onClick={handleVerifyCode}> Submit </Button> </center>
       </div>)}
      <div id="recaptcha-container"></div>
      <center> <span style={{color:'red'}}> {error} </span> </center>
    </Container>
  );
};

export default EmailPhoneVerification;

