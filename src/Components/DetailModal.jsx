import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffDetailById } from '../Api/AttendanceApis';

const DetailsModal = ({ open, handleClose, handleOpenEdit, staff, date }) => {
  const [staffDetails, setStaffDetails] = useState(null);
  const dispatch = useDispatch();
  const attendanceDetails = useSelector(state => state.attendance);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await getStaffDetailById(staff, dispatch);
        setStaffDetails(response);
      } catch (error) {
        console.error('Error fetching staff details', error);
      }
    };

    fetchStaffDetails();
  }, [staff, dispatch]);

  const formattedDate = date ? new Date(date).toDateString() : 'N/A';
  const attendance = attendanceDetails[staff._id]?.[new Date(date).toISOString().split('T')[0]] || {};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Details for {staff.name} on {formattedDate}</DialogTitle>
      <DialogContent>
        <Typography>Status: {attendance.status || 'N/A'}</Typography>
        <Typography>Wages: {attendance.moneyTaken || '₹0'}</Typography>
        <Typography>Remark: {attendance.remark || 'N/A'}</Typography>
        {staffDetails && (
          <>
            <Typography>Total Money Taken This Month: {staffDetails.currentMonthPay}</Typography>
            <Typography>Total Money Taken This Year: {staffDetails.currentYearPay}</Typography>
            <Typography>Total Days Present This Year: {staffDetails.totalDaysPresent}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
        <Button onClick={() => handleOpenEdit()} color="secondary">{attendance.status ? 'Edit' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsModal;
