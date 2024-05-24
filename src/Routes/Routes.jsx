import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Layout from '../Layout/Layout';
import Loading from '../Components/Loading';

// Lazy load the components
const LoginPage = lazy(() => import('../Pages/login'));
const Home = lazy(() => import('../Pages/Dashboard'));
const FormPage = lazy(() => import('../Pages/FormPage'));
const CustomerList = lazy(() => import('../Pages/CustomerList'));
const ViewPage = lazy(() => import('../Pages/ViewPage'));
const EditPage = lazy(() => import('../Pages/EditPage'));

const AllRoutes = ({ mode, toggleColorMode }) => {
    return (
        <Suspense fallback={<div><Loading/></div>}>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/load' element={<Loading />} />
                <Route path='/' element={<PrivateRoutes><Layout /></PrivateRoutes>} >
                    <Route path='/' element={<PrivateRoutes><Home mode={mode} toggleColorMode={toggleColorMode} /></PrivateRoutes>} />
                    <Route path='/customerLists' element={<PrivateRoutes><CustomerList mode={mode} toggleColorMode={toggleColorMode} /></PrivateRoutes>} />
                    <Route path='/form' element={<PrivateRoutes><FormPage mode={mode} toggleColorMode={toggleColorMode} /></PrivateRoutes>} />
                    <Route path='/view/:id' element={<PrivateRoutes><ViewPage mode={mode} toggleColorMode={toggleColorMode} /></PrivateRoutes>} />
                    <Route path='/edit/:id' element={<PrivateRoutes><EditPage mode={mode} toggleColorMode={toggleColorMode} /></PrivateRoutes>} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AllRoutes;
