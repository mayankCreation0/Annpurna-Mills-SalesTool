import axios from 'axios';
import Cookies from 'js-cookie';
import { handleAuth } from '../Redux/Reducer';

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