import axios from 'axios';
import Cookies from 'js-cookie';
import { handleAuth, handleLoading } from '../Redux/Reducer';

export const loginApi = async ({ username,password},dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/login', {
            username,
            password,
        });
        if(response.status === 200) {
            const {token} = response.data;
            Cookies.set('token', token, { expires: 1 });
            dispatch(handleAuth(true));
            return {state : "success" ,  response};
        } 
    } catch (error) {
       return{state : 'invalid', response:error}
    }
};

export const postFormData = async (formData,dispatch)=>{
    try {
        dispatch(handleLoading(true));
        const token = Cookies.get('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const res = await axios.post(
            "http://localhost:8080/user/add",
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

export const getList = async (queryString, dispatch) =>{
    const token = Cookies.get('token');
    try {
        dispatch(handleLoading(true));
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const response = await axios.get(`http://localhost:8080/user/get?${queryString}`, { headers })
        dispatch(handleLoading(false))
        return response
    } catch (error) {
        dispatch(handleLoading(false))
    }
}
export const getDetailsById = async (id, dispatch)=>{
    dispatch(handleLoading(true));
    const token = Cookies.get('token');
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const response = await axios.get(`http://localhost:8080/user/get/${id}`,{headers})
        dispatch(handleLoading(false))
        return response
    } catch (error) {
        dispatch(handleLoading(false))
    }
   
}

export const deleteData = async(id,dispatch)=>{
    dispatch(handleLoading(true));
    const token = Cookies.get('token');
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const res = await axios.delete(`http://localhost:8080/user/delete/${id}`,{headers}) 
        dispatch(handleLoading(false))
        return res
    } catch (error) {
        dispatch(handleLoading(false))
    }
}