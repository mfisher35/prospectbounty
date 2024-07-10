import React, { useState } from 'react';

import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import AddBountyWidget from './AddBountyWidget'

const PosterInit = ({onPosterInit}) => {
  const [bounties, setBounties] = useState([]);



  const cleanError = (error) => {
  }

  return (
    <div style={{marginTop:'30px',backgroundColor:'#ffffff',width:'fit-content',padding:'10px 150px 20px 150px',borderRadius:'8px'}}>
      <h4> Create Your First Bounty </h4>
      <AddBountyWidget bounties={bounties} setBounties={setBounties}/>
    </div>
  );
};

export default PosterInit;
