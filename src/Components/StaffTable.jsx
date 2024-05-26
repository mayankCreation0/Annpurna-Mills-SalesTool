// src/StaffTable.js

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff } from '../Api/AttendanceApis';
import DetailsModal from './DetailModal';
import EditAttendanceModal from './EditAttendanceModal';
import AddStaffModal from './AddStaffModal';

const getPreviousDays = (numDays) => {
  const dates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};

const StaffTable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEditAttendance, setOpenEditAttendance] = useState(false);
  const [openAddStaff, setOpenAddStaff] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const staffList = useSelector(state => state.staff);
  const attendanceDetails = useSelector(state => state.attendance);

  useEffect(() => {
    getStaff(dispatch);
  }, [dispatch]);

  const handleOpenDetails = (staff, date) => {
    setSelectedStaff(staff);
    setSelectedDate(date);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedStaff(null);
    setSelectedDate(null);
  };

  const handleOpenEditAttendance = (staff, date, adding) => {
    setSelectedStaff(staff);
    setSelectedDate(date);
    setIsAdding(adding);
    setOpenEditAttendance(true);
  };

  const handleCloseEditAttendance = () => {
    setOpenEditAttendance(false);
    setOpenDetails(false);
    setIsAdding(false);
  };

  const dates = getPreviousDays(365);

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddStaff(true)}
        style={{ marginBottom: '16px' }}
      >
        Add Staff
      </Button>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 10, fontWeight: 'bold' }}>Name</TableCell>
              {dates.map((date, idx) => (
                <TableCell key={idx} style={{ backgroundColor: '#fff', fontWeight: 'bold' }}>{date.toDateString()}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {staffList.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell
                  style={{ position: 'sticky', left: 0, backgroundColor: '#fff', zIndex: 10, cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => handleOpenDetails(staff, null)}
                >
                  {staff.name}
                </TableCell>
                {dates.map((date) => {
                  const formattedDate = date.toISOString().split('T')[0];
                  const attendance = attendanceDetails[staff._id]?.[formattedDate];
                  return (
                    <TableCell key={formattedDate}>
                      <Button
                        onClick={() => {
                          if (attendance) {
                            handleOpenDetails(staff, formattedDate);
                          } else {
                            handleOpenEditAttendance(staff, formattedDate, true);
                          }
                        }}
                        style={{
                          fontWeight: attendance ? 'bold' : 'normal',
                          color: attendance
                            ? attendance.status === 'present' ? 'green'
                              : attendance.status === 'half day' ? 'orange'
                                : 'red'
                            : '#000'
                        }}
                      >
                        {attendance ? `${attendance.status} (₹${attendance.moneyTaken || '0'})` : 'Add'}
                      </Button>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedStaff && selectedDate && (
          <DetailsModal
            open={openDetails}
            handleClose={handleCloseDetails}
            handleOpenEdit={() => handleOpenEditAttendance(selectedStaff, selectedDate, false)}
            staff={selectedStaff}
            date={selectedDate}
          />
        )}
        {openEditAttendance && (
          <EditAttendanceModal
            open={openEditAttendance}
            handleClose={handleCloseEditAttendance}
            staff={selectedStaff}
            date={selectedDate}
            isAdding={isAdding}
          />
        )}
        {openAddStaff && (
          <AddStaffModal
            open={openAddStaff}
            handleClose={() => setOpenAddStaff(false)}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default StaffTable;
