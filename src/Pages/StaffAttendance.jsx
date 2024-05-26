// src/App.js

import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/staffCalendar.css';
import AttendanceForm from '../Components/AttendanceForm';
import StaffTable from '../Components/StaffTable';
import { useDispatch } from 'react-redux';
import { getStaff } from '../Api/AttendanceApis';

function StaffAttendance() {
  const [staffList, setStaffList] = useState([]);
  const [attendanceDetails, setAttendanceDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStaff(dispatch);
  }, []);

  const fetchStaff = async (dispatch) => {
    try {
      getStaff(dispatch)
      // const response = await axios.get('http://localhost:8080/staff/get');
      // setStaffList(response.data);
      // fetchAllStaffAttendance(response.data);
    } catch (error) {
      console.error('Error fetching staff data', error);
    }
  };

  // const fetchAllStaffAttendance = async (staffList,dispatch) => {
  //   const allAttendance = {};
  //   try {
  //     for (const staff of staffList) {
  //       const response = await axios.get(`http://localhost:8080/attendance/staff/${staff._id}`);
  //       allAttendance[staff._id] = response.data.reduce((acc, item) => {
  //         const date = new Date(item.date).toISOString().split('T')[0];
  //         acc[date] = item;
  //         return acc;
  //       }, {});
  //     }
  //     setAttendanceDetails(allAttendance);
  //   } catch (error) {
  //     console.error('Error fetching attendance data', error);
  //   }
  // };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Staff Attendance Management
      </Typography>
      <AttendanceForm />
      <StaffTable />
    </Container>
  );
}

export default StaffAttendance;
