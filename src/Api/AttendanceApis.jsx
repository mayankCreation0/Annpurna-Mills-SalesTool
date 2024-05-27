import axios from 'axios';
import { handleAttendance, handleStaff } from '../Store/Reducers/Reducer';
const API_BASE_URL = process.env.REACT_APP_AMS_PROD_URL;

export const getStaff = async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}staff/get`);
    dispatch(handleStaff(response.data));
    fetchAllStaffAttendance(response.data, dispatch);
  } catch (error) {
    console.error('Error fetching staff data', error);
  }
};
export const addStaff = async ({ name, role },dispatch) =>{
  try {
    await axios.post(`${API_BASE_URL}staff/add`, { name, role });
    getStaff(dispatch);
  } catch (error) {
    console.log(error)
  }
}
// Update an existing staff
export const updateStaff = async (staff, dispatch) => {
  try {
    await axios.patch(`${API_BASE_URL}staff/update/${staff._id}`, staff);
    getStaff(dispatch); // Refresh the staff list
  } catch (error) {
    console.error('Error updating staff', error);
  }
};

// Delete a staff
export const deleteStaff = async (staffId, dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}staff/delete/${staffId}`);
    getStaff(dispatch); // Refresh the staff list
  } catch (error) {
    console.error('Error deleting staff', error);
  }
};

export const fetchAllStaffAttendance = async (staffList, dispatch) => {
  const allAttendance = {};
  try {
    for (const staff of staffList) {
      const response = await axios.get(`${API_BASE_URL}attendance/staff/${staff._id}`);
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
    await axios.post(`${API_BASE_URL}attendance/add`, attendanceData);
    getStaff(dispatch)
  } catch (error) {
    console.error('Error saving attendance data', error);
  }
};

export const patchAttendance = async (attendanceData,dispatch) => {
  try {
    await axios.patch(`${API_BASE_URL}attendance/update/${attendanceData._id}`, attendanceData);
    getStaff(dispatch);
  } catch (error) {
    console.error('Error updating attendance data', error);
  }
};

export const getStaffDetailById = async (staff) => {
  try {
    const response = await axios.get(`${API_BASE_URL}staff/get/${staff._id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching staff details', error);
  }
};
