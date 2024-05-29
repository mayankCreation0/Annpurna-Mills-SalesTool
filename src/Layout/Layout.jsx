import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import Loading from '../Components/Loading';
import ThemeToggle from '../Components/ThemeToggle';
import BottomNav from '../Components/BottomNav';

// Lazy load the Navbar
const Navbar = lazy(() => import('../Components/Navbar'));

const Layout = () => {
    return (
          <Paper  component={'section'} sx={{bgcolor:"applicationTheme.primary", backgroundImage:"none" , borderRadius:"0px", boxShadow:"none"}} className='h-screen w-full flex justify-center items-center'>
               <Box className="h-full container flex flex-col justify-center items-center gap-2 overflow-hidden p-2  bg-transparent">
                          
                       {/*   <Suspense fallback={<div><Loading/></div>}> */}
                                <Navbar />
                         {/* </Suspense> */}

                       <Paper component={'div'} className="w-full flex-grow overflow-y-auto !shadow-none px-2 pb-16 sm:pt-28 "  sx={{bgcolor:'applicationTheme.primary', backgroundImage:"none"}}>
                          <Outlet/>  
                       </Paper>

                       <BottomNav sx={{position:'fixed', bottom:'0'}} />
               </Box>     
                         
          </Paper>
    )
}

export default Layout;