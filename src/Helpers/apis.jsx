import axios from 'axios';
import Cookies from 'js-cookie';
import { handleAnalytics, handleAuth, handleLoading } from '../Redux/Reducer';

export const loginApi = async ({ username, password }, dispatch) => {
    try {
        const response = await axios.post('https://annpurna-mills-server.vercel.app/login', {
            username,
            password,
        });
        if (response.status === 200) {
            const { token } = response.data;
            Cookies.set('token', token, { expires: 1 });
            dispatch(handleAuth(true));
            return { state: "success", response };
        }
    } catch (error) {
        return { state: 'invalid', response: error }
    }
};

export const postFormData = async (formData, dispatch) => {
    try {
        dispatch(handleLoading(true));
        const token = Cookies.get('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const res = await axios.post(
            "https://annpurna-mills-server.vercel.app/user/add",
            formData,
            {
                headers,
            }
        );
        console.log(res)
        dispatch(handleLoading(false))
        return { state: "success" };
    } catch (error) {
        dispatch(handleLoading(false))
        return { state: 'invalid' }
    }
}

export const getList = async (queryString, dispatch) => {
    const token = Cookies.get('token');
    try {
        dispatch(handleLoading(true));
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const response = await axios.get(`https://annpurna-mills-server.vercel.app/user/get?${queryString}`, { headers })
        dispatch(handleLoading(false))
        return response
    } catch (error) {
        dispatch(handleLoading(false))
    }
}

export const getAnalytics = async (dispatch) => {
    const token = Cookies.get('token');
    try {
        dispatch(handleLoading(true));
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const response = await axios.get(`https://annpurna-mills-server.vercel.app/user/get/analytics`, { headers })
        dispatch(handleAnalytics(response.data))
        dispatch(handleLoading(false))
        return response
    } catch (error) {

    }
}

export const getDetailsById = async (id, dispatch) => {
    dispatch(handleLoading(true));
    const token = Cookies.get('token');
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const response = await axios.get(`https://annpurna-mills-server.vercel.app/user/get/${id}`, { headers })
        dispatch(handleLoading(false))
        return response
    } catch (error) {
        dispatch(handleLoading(false))
    }

}

export const deleteData = async (id, dispatch) => {
    dispatch(handleLoading(true));
    const token = Cookies.get('token');
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const res = await axios.delete(`https://annpurna-mills-server.vercel.app/user/delete/${id}`, { headers })
        dispatch(handleLoading(false))
        return res
    } catch (error) {
        dispatch(handleLoading(false))
    }
}