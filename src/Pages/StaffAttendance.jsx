// src/App.js

import React, {  useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import AttendanceForm from '../Components/AttendanceForm';
import StaffTable from '../Components/StaffTable';
import { useDispatch } from 'react-redux';
import { getStaff } from '../Api/AttendanceApis';

function StaffAttendance() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStaff(dispatch);
  }, []);

  const fetchStaff = async (dispatch) => {
    try {
      getStaff(dispatch)
    } catch (error) {
      console.error('Error fetching staff data', error);
    }
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Staff Attendance Management
      </Typography>
      <StaffTable />
      <AttendanceForm />
    </Container>
  );
}

export default StaffAttendance;
