// src/AttendanceForm.js

import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { postAttendance } from '../Api/AttendanceApis';

const AttendanceForm = () => {
  // const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [moneyTaken, setMoneyTaken] = useState('');
  const [remark, setRemark] = useState('');
  const staffList = useSelector(state => state.staff)
  const dispatch =useDispatch()
  useEffect(() => {
    // const fetchStaff = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:8080/staff/get');
    //     setStaffList(response.data);
    //   } catch (error) {
    //     console.error('Error fetching staff data', error);
    //   }
    // };

    // fetchStaff();

  }, []);

  const handleSubmit = async () => {
    const attendanceData = {
      staffId: selectedStaff,
      date,
      status,
      moneyTaken,
      remark,
    };
    await postAttendance(attendanceData ,dispatch);
    setSelectedStaff('');
    setDate('');
    setStatus('');
    setMoneyTaken('');
    setRemark('');
    // try {
    //   await axios.post('http://localhost:8080/attendance/add', attendanceData);
    //   // fetchAttendance();
    //   setSelectedStaff('');
    //   setDate('');
    //   setStatus('');
    //   setMoneyTaken('');
    //   setRemark('');
    // } catch (error) {
    //   console.error('Error saving attendance data', error);
    // }
  };

  return (
    <Paper style={{ padding: '16px', border: '1px solid #ccc' }}>
      <Typography variant="h6">Add/Edit Attendance</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="staff-label">Staff</InputLabel>
            <Select
              labelId="staff-label"
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
            >
              {staffList.map((staff) => (
                <MenuItem key={staff._id} value={staff._id}>
                  {staff.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="half day">Half Day</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Wages"
            value={moneyTaken}
            onChange={(e) => setMoneyTaken(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Remark"
            multiline
            rows={4}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AttendanceForm;
