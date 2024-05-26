import axios from 'axios';
import { handleAttendance, handleStaff } from '../Store/Reducers/Reducer';

export const getStaff = async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8080/staff/get');
    dispatch(handleStaff(response.data));
    fetchAllStaffAttendance(response.data, dispatch);
  } catch (error) {
    console.error('Error fetching staff data', error);
  }
};

export const fetchAllStaffAttendance = async (staffList, dispatch) => {
  const allAttendance = {};
  try {
    for (const staff of staffList) {
      const response = await axios.get(`http://localhost:8080/attendance/staff/${staff._id}`);
      allAttendance[staff._id] = response.data.reduce((acc, item) => {
        const date = new Date(item.date).toISOString().split('T')[0];
        acc[date] = item;
        return acc;
      }, {});
    }
    dispatch(handleAttendance(allAttendance));
  } catch (error) {
    console.error('Error fetching attendance data', error);
  }
};

export const postAttendance = async (attendanceData,dispatch) => {
  try {
    await axios.post('http://localhost:8080/attendance/add', attendanceData);
    getStaff(dispatch)
  } catch (error) {
    console.error('Error saving attendance data', error);
  }
};

export const patchAttendance = async (attendanceData,dispatch) => {
  try {
    await axios.patch(`http://localhost:8080/attendance/update/${attendanceData._id}`, attendanceData);
    getStaff(dispatch);
  } catch (error) {
    console.error('Error updating attendance data', error);
  }
};

export const getStaffDetailById = async (staff) => {
  try {
    const response = await axios.get(`http://localhost:8080/staff/get/${staff._id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching staff details', error);
  }
};
