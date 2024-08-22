import React, { useState } from 'react';

import styled from 'styled-components';
import Logo from '../assets/logofull.png';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ConfirmModal({show,text,handleClose,onConfirm}) {
  const [saving,  setSaving] = useState(false);
 
  const onYes = () => {
    setSaving(true);
    onConfirm();
    setSaving(false);
    handleClose();
  }

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
         {saving ? <Spinner variant="primary"/> : <Button variant="primary" onClick={onYes}> 
            Yes
          </Button>}
        </Modal.Footer>
      </Modal>
  );
}

export default ConfirmModal;
