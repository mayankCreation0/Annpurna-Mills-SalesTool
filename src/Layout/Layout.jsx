import React, { Suspense, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import Loading from '../Components/Loading';
import BottomNav from '../Components/BottomNav';
import '../Styles/button.css';
import GoldSilverRatesComponent from '../Components/Gold&SIlverRates';

// Lazy load the Navbar
const Navbar = lazy(() => import('../Components/Navbar'));

const Layout = () => {
  const location = useLocation();
  const overflow = location.pathname.toLowerCase().includes('customerlists')
    ? 'hidden'
    : 'auto';

  return (
    <Paper component={'section'} sx={{ bgcolor: "applicationTheme.primary", backgroundImage: "none", borderRadius: "0px", boxShadow: "none" }} className='h-screen w-full flex justify-center items-center'>
      <Box className="h-full container flex flex-col justify-center items-center gap-2 overflow-hidden p-2 bg-transparent">
        <Suspense fallback={<div><Loading /></div>}>
          <Navbar />
          {/* Conditionally render GoldSilverRatesComponent */}
          {location.pathname === '/' ? <GoldSilverRatesComponent /> : null}
        </Suspense>
        <Paper component={'div'} className="w-full flex-grow  !shadow-none p-2" sx={{ bgcolor: 'applicationTheme.primary', backgroundImage: "none", padding: '0px', overflowY: overflow }}>
          <Outlet />
          <Box component={'div'} sx={{ display: { xs: 'block', md: 'none' }, height: "80px", width: "100%"}} />
        </Paper>
        <BottomNav sx={{ position: 'fixed', bottom: '0', zIndex: 100 }} />
      </Box>
    </Paper>
  );
}

export default Layout;
