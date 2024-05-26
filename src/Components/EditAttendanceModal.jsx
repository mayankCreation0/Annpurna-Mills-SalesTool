import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { getStaffDetailById, patchAttendance, postAttendance } from '../Api/AttendanceApis';
import { useDispatch } from 'react-redux';

const EditAttendanceModal = ({ open, handleClose, staff, date, isAdding }) => {
  const [status, setStatus] = useState('');
  const [moneyTaken, setMoneyTaken] = useState('');
  const [remark, setRemark] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAdding) {
      const fetchAttendanceData = async () => {
        try {
          const response = await getStaffDetailById(staff);
          const formattedDate = new Date(date).toISOString().split('T')[0];
          const attendance = response.attendance[formattedDate] || {};
          setStatus(attendance.status || '');
          setMoneyTaken(attendance.moneyTaken || '');
          setRemark(attendance.remark || '');
        } catch (error) {
          console.error('Error fetching attendance data', error);
        }
      };

      fetchAttendanceData();
    }
  }, [isAdding, staff, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      staffId: staff._id,
      date,
      status,
      moneyTaken,
      remark,
    };

    try {
      if (isAdding) {
        await postAttendance(updatedData);
      } else {
        await patchAttendance(updatedData);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving attendance data', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isAdding ? 'Add' : 'Edit'} Attendance for {staff.name} on {new Date(date).toDateString()}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="half day">Half Day</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Wages"
          value={moneyTaken}
          onChange={(e) => setMoneyTaken(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <TextField
          fullWidth
          label="Remark"
          multiline
          rows={4}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
        <Button onClick={handleSubmit} color="secondary">{isAdding ? 'Add' : 'Update'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAttendanceModal;
