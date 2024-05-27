import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Paper } from '@mui/material';
import Loading from '../Components/Loading';
import '../Styles/button.css'
import GoldSilverRatesComponent from '../Components/Gold&SIlverRates';

// Lazy load the Navbar
const Navbar = lazy(() => import('../Components/Navbar'));

const Layout = () => {
  return (
    <Paper
      component={'section'}
      sx={{ bgcolor: "applicationTheme.bgColor" }}
      className="h-screen w-full flex flex-col justify-start items-start gap-2 overflow-hidden p-2"
    >
      <Suspense fallback={<div><Loading/></div>}>
        <Navbar />
        <GoldSilverRatesComponent/>
      </Suspense>
      <Paper component={'div'} className="w-full flex-grow overflow-y-auto !shadow-none">
        <Outlet />
      </Paper>
    </Paper>
  );
};

export default Layout;
