import React, { useEffect, useState } from 'react';
import '../App.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import { where, query, doc, getDocs, getDoc, collection, setDoc, addDoc, getFirestore } from "firebase/firestore";


const UserBountyAssignmentWidget = ({user, auth, db, userData}) => {
  //const [paymentError, setPaymentError] = useState("");

  return (
    <div>
       UserBounty 
    </div>
  );
};

export default UserBountyAssignmentWidget;
