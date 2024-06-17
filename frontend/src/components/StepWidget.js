import React, { useState } from 'react';
import './StepWidget.css';
import Step1Img from '../assets/step1.png';

const steps = [
  { 
    title: 'Quick Survey', 
    subheading: 'Introduction', 
    imgSrc: Step1Img,
    content: 'Welcome to the process! This step will guide you through the basics of our service and how to get started.'
  },
  { 
    title: 'Step 2', 
    subheading: 'Configuration', 
    imgSrc: '/step2.png',
    content: 'Configure your settings in this step. Make sure to review all the options to customize the experience to your needs.'
  },
  { 
    title: 'Step 3', 
    subheading: 'Verification', 
    imgSrc: '/step3.png',
    content: 'Verify your information. Please double-check that all your entered details are accurate and up to date.'
  },
  { 
    title: 'Step 4', 
    subheading: 'Completion', 
    imgSrc: '/step4.png',
    content: 'All set! You have successfully completed the setup. Click finish to start using the platform.'
  }
];

function StepWidget() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { title, subheading, imgSrc, content } = steps[currentStep];
  const isImageLeft = currentStep % 2 === 0; // Image on the left for even steps

  return (
    <div className="widget-container">
      <div className="header" style={{width:'100%'}}>

        <h1>How Does FriendZone Work?</h1>
        <h2>{title+" "+subheading}</h2>
      </div>
      <div className="content-layout">
           {isImageLeft && <img src={imgSrc} alt="Step illustration" className="step-image" />}
           <p className="content">{content}</p>
           {!isImageLeft && <img src={imgSrc} alt="Step illustration" className="step-image" />}
      </div>
        <div className="progress-indicators">
           {steps.map((step, index) => (
            <div className={`circle ${index <= currentStep ? 'filled' : ''}`} key={index}></div>
           ))}
         </div> 

      <div className="footer">
        <button id="circbutton" onClick={handlePrev} disabled={currentStep === 0}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button id="circbutton" onClick={handleNext} disabled={currentStep === steps.length - 1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default StepWidget;

