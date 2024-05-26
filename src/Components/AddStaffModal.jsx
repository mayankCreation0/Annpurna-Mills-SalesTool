import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

const AddStaffModal = ({ open, handleClose, getStaff }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/staff/add', { name, role });
      getStaff();
      handleClose();
    } catch (error) {
      console.error('Error adding staff', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Staff</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          fullWidth
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
        <Button onClick={handleSubmit} color="secondary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffModal;
