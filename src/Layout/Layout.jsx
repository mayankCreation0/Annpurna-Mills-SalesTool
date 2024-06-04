import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import Loading from '../Components/Loading';
import BottomNav from '../Components/BottomNav';
import '../Styles/button.css'
import GoldSilverRatesComponent from '../Components/Gold&SIlverRates';


// Lazy load the Navbar
const Navbar = lazy(() => import('../Components/Navbar'));

const Layout = () => {
    return (
          <Paper  component={'section'} sx={{bgcolor:"applicationTheme.primary", backgroundImage:"none" , borderRadius:"0px", boxShadow:"none"}} className='h-screen w-full flex justify-center items-center'>
               <Box className="h-full container flex flex-col justify-center items-center gap-2 overflow-hidden p-2  bg-transparent">
                          
                         <Suspense fallback={<div><Loading/></div>}>
                                <Navbar />

                                <GoldSilverRatesComponent/>
                         </Suspense>

                       {/* sx={{bgcolor: {xs:'applicationTheme.primaryColor_1', md:"applicationTheme.primary"}}} */}
                       <Paper component={'div'} className="w-full flex-grow overflow-y-auto !shadow-none p-2"  sx={{bgcolor:'applicationTheme.primary', backgroundImage:"none"}}>
                          <Outlet/>  
                          <Box component={'div'} sx={{display:{xs:'block', md:'none'},height:"80px", width:"100%"}}> </Box>
                       </Paper>

                       <BottomNav sx={{position:'fixed', bottom:'0', zIndex:100}} />
               </Box>     
                         
          </Paper>
    )
}

export default Layout;