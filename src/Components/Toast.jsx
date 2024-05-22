// Toast.js
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../Store/Reducers/Reducer';


const Toast = () => {
    const { show, message, type,theme } = useSelector((state) => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (show) {
            toast[type](message);
            dispatch(hideToast());
        }
    }, [show, message, type, dispatch]);

    return <ToastContainer theme={theme} />;
};

export default Toast;
