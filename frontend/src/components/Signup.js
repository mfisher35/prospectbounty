import React, { useState } from 'react';
import {signupAPI} from './APIHelpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css'
import Logo from '../assets/friendzonefull.png'
import Spinner from 'react-bootstrap/Spinner';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    spam:'',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  let statesList = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
                      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
                      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
                      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
                      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  statesList.sort();
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  };

  const validateSpam = (text) => {
    return ["four","4"].indexOf(text.toLowerCase()) >= 0;
  };


 const isMobile = () => {
   return window.innerWidth <= 768;
 }

 const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear errors for the current input
    setErrors(prev => ({ ...prev, [name]: '' }));
    setFormData(prev => ({ ...prev, [name]: value}));

    if (name === 'email' && value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
    }
    if (name === 'spam' && value && !validateSpam(value)) {
      setErrors(prev => ({ ...prev, spam: 'Please enter a spam check answer.' }));
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || errors.email) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      return; // Stop submission if email is invalid
    }
    if (errors.spam) {
      setErrors(prev => ({ ...prev, email: 'Please correct spam check input.' }));
      return; // Stop submission if email is invalid
    }
    setSubmitting(true);
    signupAPI(formData)
      .then(response => {
        setResponseMessage(response.message);
	setSubmitting(false);
        window.gtag('event', 'conversion', {
          'send_to': 'AW-16569246807/YlQLCNeQzrAZENfI6tw9',
          'value': 1.0,
          'currency': 'USD'
        });

        // Optionally reset form here
        // setFormData({firstName: '', lastName: '', email: '', city: '', state: '', zipCode: ''});
      })
      .catch(error => {
        setResponseMessage('Error submitting form');
	setSubmitting(false);
      });
  };

  return (
  <div style={{backgroundColor:'#242424',width:"100vw",height:"1300px"}}>
    <div style={{padding:'25px'}}>
       <center> <a href="https://www.friendzone.best"> <img src={Logo} width={isMobile() ? '200px' : '300px'}/> </a> </center>
    </div>
    <div id="sudiv" className="container py-5" style={{marginTop:'0px'}}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 id="suh2" className="mb-4 text-center text-uppercase text-shadow">SIGN UP </h2>
<h3 className="mb-4 text-center"> Get Alerted When We Launch in Your City!</h3>
          {responseMessage == "" && (<form onSubmit={handleSubmit} className="card form-shadow p-4">
             <div className="mb-3">
               <input type="text" className="form-control custom-input" name="firstName" placeholder="First Name" onChange={handleChange} />
             </div>
             <div className="mb-3">
               <input type="text" className="form-control custom-input" name="lastName" placeholder="Last Name" onChange={handleChange} />
             </div>
             <div className="mb-3">
                <input type="email" className="form-control custom-input" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                {errors.email && <div className="text-danger" id="errtext">{errors.email}</div>}
              </div>

              <div className="row mb-3">
                 <div className="col-md-4">
                   <input type="text" className="form-control custom-input" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                 </div>
                 <div className="col-md-4">
                   <select className="form-control custom-input" name="state" value={formData.state} onChange={handleChange}>
                     <option value="">{formData.state == "" ? "Select a State" : formData.state}</option>
                     {statesList.map(state => (
                       <option key={state} value={state}>{state}</option>
                     ))}
                   </select>
                 </div>
                 <div className="col-md-4">
                   <input type="text" className="form-control custom-input" name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} />
                 </div>
            </div>

	      <div className="mb-3">
                <input type="text" className="form-control custom-input" name="spam" placeholder="Spam Check: What is 2+2?" value={formData.spam} onChange={handleChange} />
                {errors.spam && <div className="text-danger" id="errtext">{errors.spam}</div>}
              </div>
               <center>
		  { submitting ?  <Spinner animation="border" variant="light"/> : <button type="submit" className="btn btn-primary w-100 custom-button">Submit</button> }
		  </center>
          </form>)}
          {responseMessage != ""  && (<div className="mt-4 alert alert-info">{responseMessage}</div>)}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Signup;

