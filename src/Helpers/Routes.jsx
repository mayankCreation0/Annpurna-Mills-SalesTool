import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import PrivateRoutes from './privateRoutes'
import LoginPage from '../Pages/login'
import Home from '../Pages/Home'
import Navbar from '../Components/Navbar'
import FormPage from '../Pages/FormPage'
import CustomerList from '../Pages/CustomerList'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { handleAuth } from '../Redux/Reducer'
import ViewPage from '../Pages/ViewPage'
import EditPage from '../Pages/EditPage'

const AllRoutes = ({ mode, toggleColorMode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login')
            dispatch(handleAuth(false))
        }
    },[dispatch, navigate])

    return (<>
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/home' element={<PrivateRoutes><Home /></PrivateRoutes>} />
            <Route path='/customerLists' element={<PrivateRoutes><CustomerList /></PrivateRoutes>} />
            <Route path='/form' element={<PrivateRoutes><FormPage /></PrivateRoutes>} />
            <Route path='/view/:id' element={<PrivateRoutes><ViewPage /></PrivateRoutes>} />
            <Route path='/edit/:id' element={<PrivateRoutes><EditPage /></PrivateRoutes>} />
        </Routes></>
    )
}

export default AllRoutes
