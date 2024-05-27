import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { addStaff, updateStaff } from '../Api/AttendanceApis';
import { useDispatch } from 'react-redux';

const AddStaffModal = ({ open, handleClose, staff, isEdit }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit && staff) {
      setName(staff.name);
      setRole(staff.role);
    } else {
      setName('');
      setRole('');
    }
  }, [isEdit, staff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateStaff({ ...staff, name, role }, dispatch);
      } else {
        await addStaff({ name, role }, dispatch);
      }
      handleClose();
    } catch (error) {
      console.error('Error adding/updating staff', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEdit ? 'Edit Staff' : 'Add New Staff'}</DialogTitle>
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
        <Button onClick={handleSubmit} color="secondary">{isEdit ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffModal;
