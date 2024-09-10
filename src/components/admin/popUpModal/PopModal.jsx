import React from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const ModalContainer = styled('div')({
  position: 'absolute',
  width: 400,
  backgroundColor: 'white',
  boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
  padding: '24px',
  outline: 'none',
  borderRadius: '8px',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const ModalTitle = styled(Typography)({
  marginBottom: '16px',
  color: '#2196F3', // adjust to your theme
});

const ModalDescription = styled(Typography)({
  color: '#666', // adjust to your theme
});

const CloseButton = styled(Button)({
  marginTop: '16px',
  backgroundColor: '#f44336', // adjust to your theme
  color: 'white',
  '&:hover': {
    backgroundColor: '#d32f2f', // adjust to your theme
  },
});

const PopModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <ModalContainer>
        <ModalTitle variant="h6">Permission Denied</ModalTitle>
        <ModalDescription>You don't have permission to access this page.</ModalDescription>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContainer>
    </Modal>
  );
};

export default PopModal;
