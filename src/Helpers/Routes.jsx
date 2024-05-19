import React   from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import PrivateRoutes from './privateRoutes'
import LoginPage from '../Pages/login'
import Home from '../Pages/Home'
import FormPage from '../Pages/FormPage'
import CustomerList from '../Pages/CustomerList'
import ViewPage from '../Pages/ViewPage'
import EditPage from '../Pages/EditPage'

const AllRoutes = ({ mode, toggleColorMode }) => {

    return (<>
        {/* <Navbar mode={mode} toggleColorMode={toggleColorMode} /> */}
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<PrivateRoutes><Home mode={mode} toggleColorMode={toggleColorMode}/></PrivateRoutes>} />
            <Route path='/customerLists' element={<PrivateRoutes><CustomerList mode={mode} toggleColorMode={toggleColorMode}/></PrivateRoutes>} />
            <Route path='/form' element={<PrivateRoutes><FormPage mode={mode} toggleColorMode={toggleColorMode}/></PrivateRoutes>} />
            <Route path='/view/:id' element={<PrivateRoutes><ViewPage mode={mode} toggleColorMode={toggleColorMode}/></PrivateRoutes>} />
            <Route path='/edit/:id' element={<PrivateRoutes><EditPage mode={mode} toggleColorMode={toggleColorMode}/></PrivateRoutes>} />
        </Routes></>
    )
}

export default AllRoutes
