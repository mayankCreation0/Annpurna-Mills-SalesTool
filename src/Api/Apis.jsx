import axios from 'axios';
import Cookies from 'js-cookie';
import { handleAnalytics, handleAuth, handleGetData, handleLoading, showToast } from '../Store/Reducers/Reducer';

const API_BASE_URL = process.env.REACT_APP_AMS_PROD_URL;

export const refreshData = async (dispatch, navigate) => {
    try {
        const token = Cookies.get('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Call both APIs simultaneously
        const [listResponse, analyticsResponse] = await Promise.all([
            axios.get(`${API_BASE_URL}user/get`, { headers }),
            axios.get(`${API_BASE_URL}user/get/analytics`, { headers })
        ]);

        // Update state with the responses
        dispatch(handleGetData(listResponse.data));
        dispatch(handleAnalytics(analyticsResponse.data));
    } catch (error) {
        if (error.response && error.response.status === 400) {
            dispatch(showToast({ message: 'Token expired, Login again', type: 'error' }));
            dispatch(handleAuth(false));
            navigate('/login');
        } else {
            dispatch(showToast({ message: 'Failed to refresh data', type: 'error' }));
        }
    }
};

export const loginApi = async ({ username, password }, dispatch, navigate) => {
    try {
        const response = await axios.post(`${API_BASE_URL}login`, { username, password });
        if (response.status === 200) {
            const { token } = response.data;
            Cookies.set('token', token, { expires: 1 });
            dispatch(handleAuth(true));
            dispatch(showToast({ message: 'hi Mayank Raj welcome back', type: 'success' }));
            navigate('/');
        }
    } catch (error) {
        dispatch(showToast({ message: 'Login failed', type: 'error' }));
    }
};

export const postFormData = async (formData, dispatch, navigate) => {
    try {
        dispatch(handleLoading(true));
        const token = Cookies.get('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        await axios.post(`${API_BASE_URL}user/add`, formData, { headers });
        dispatch(handleLoading(false));
        dispatch(showToast({ message: 'Form data submitted successfully', type: 'success' }));
        navigate('/customerLists');

        // Refresh data
        await refreshData(dispatch, navigate);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            dispatch(showToast({ message: 'Token expired, Login again', type: 'error' }));
            dispatch(handleAuth(false));
            navigate('/login');
        } else {
            dispatch(showToast({ message: 'Failed to submit form data', type: 'error' }));
        }
        dispatch(handleLoading(false));
    }
}

export const getList = async (dispatch, navigate) => {
    const token = Cookies.get('token');
    try {
        dispatch(handleLoading(true));
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}user/get`, { headers });
        dispatch(handleGetData(response.data));
        dispatch(handleLoading(false));
        return response;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            dispatch(showToast({ message: 'Token expired, Login again', type: 'error' }));
            dispatch(handleAuth(false));
            navigate('/login');
        }
        dispatch(handleLoading(false));
    }
}

export const getAnalytics = async (dispatch, navigate) => {
    const token = Cookies.get('token');
    try {
        dispatch(handleLoading(true));
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}user/get/analytics`, { headers });
        dispatch(handleAnalytics(response.data));
        dispatch(handleLoading(false));
        return response;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            dispatch(showToast({ message: 'Token expired, Login again', type: 'error' }));
            dispatch(handleAuth(false));
            navigate('/login');
        }
        dispatch(handleLoading(false));
    }
};

export const getDetailsById = async (id, dispatch, navigate) => {
    dispatch(handleLoading(true));
    const token = Cookies.get('token');
    try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}user/get/${id}`, { headers });
        dispatch(handleLoading(false));
        return response;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            dispatch(showToast({ message: 'Token expired, Login again', type: 'error' }));
            dispatch(handleAuth(false));
            navigate('/login');
        }
        dispatch(handleLoading(false));
    }
}

export const deleteData = async (id, dispatch, navigate) => {
    dispatch(handleLoading(true));
    const token = Cookies.get('token');
    try {
        const headers = { Authorization: `Bearer ${token}` };
        await axios.delete(`${API_BASE_URL}user/delete/${id}`, { headers });
        dispatch(showToast({ message: 'Customer deleted successfully', type: 'success', theme: "colored" }));
        dispatch(handleLoading(false));

        // Refresh data
        await refreshData(dispatch, navigate);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            dispatch(showToast({ message: 'Token expired, Login again', type: 'error' }));
            dispatch(handleAuth(false));
            navigate('/login');
        } else {
            dispatch(showToast({ message: 'Failed to delete customer data', type: 'error' }));
        }
        dispatch(handleLoading(false));
    }
}