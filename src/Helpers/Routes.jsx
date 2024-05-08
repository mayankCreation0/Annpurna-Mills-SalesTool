import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoutes from './privateRoutes'
import LoginPage from '../Pages/login'
import Home from '../Pages/Home'
import Navbar from '../Components/Navbar'
import FormPage from '../Pages/FormPage'
import CoustomerList from '../Pages/CoustomerList'

const AllRoutes = ({ mode, toggleColorMode }) => {
    return (<>
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/home' element={<PrivateRoutes><Home /></PrivateRoutes>} />
            <Route path='/coustomerLists' element={<PrivateRoutes><CoustomerList /></PrivateRoutes>} />
            <Route path='/form' element={<PrivateRoutes><FormPage /></PrivateRoutes>} />
        </Routes></>
    )
}

export default AllRoutes
