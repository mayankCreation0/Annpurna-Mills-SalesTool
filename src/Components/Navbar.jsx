import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { handleAuth } from '../Store/Reducers/Reducer';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../Assets/logo_transparent.png';
import ThemeToggle from './ThemeToggle';

const logoStyle = {
    width: '100px',
    height: '3.5rem',
    cursor: 'pointer',
};

const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Customer List', icon: <ListIcon />, path: '/customerLists' },
    { text: 'Add Customer', icon: <AddIcon />, path: '/form' },
    { text: 'Staff', icon: <AddIcon />, path: '/staff' },
];

function Navbar({sx}) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const handleLogout = () => {
        Cookies.remove('token', { path: '/login' });
        dispatch(handleAuth(false));
        navigate('/login');
    };

    return (
        <>
        <Box  display={{xs:'none', md: 'flex'}}  sx={{ justifyItems:"start", alignItems: "center", gap:"20px", width:"100%",}}>
            <Box component="div" sx={{ display:'flex',justifyContent: 'space-between',  alignItems: 'center', width: '100%', bgcolor: "applicationTheme.secondary", padding: '5px 10px', borderRadius: '30px', borderBottom:"1px solid lightgrey", ...sx }}>
                 <img
                    src={logo}
                    style={logoStyle}
                    alt="logo of sitemark"
                    onClick={() => navigate('/')}
                /> 
                {/* <Box component={'div'}></Box> */}

                <Stack flexDirection={'row'} spacing={'20px'} justifyContent={'start'} alignItems={'center'} gap={"20px"}>
                    {menuItems.map((item, index) => (
                        <MenuItem
                            disableRipple="true"
                            key={index}
                            onClick={() => navigate(item.path)}
                            className='!m-0'
                            sx={{
                                display: 'flex',
                                flexDirection: "row",
                                gap:"1px",
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: location.pathname === item.path ? "applicationTheme.primary" : 'transparent',
                                borderRadius: "30px",
                                ":hover":{
                                    backgroundColor: location.pathname === item.path ? "applicationTheme.primary" : 'transparent',
                                }   ,
                                ":focus":{
                                    backgroundColor: location.pathname === item.path ? "applicationTheme.primary" : 'transparent',
                                }   ,   
                             
                                padding: '10px 15px',
                                
                                position: 'relative',
                                
                               
                               
                            }}
                        >
                        {/*   {item.icon}   */}
                            <Typography variant="p" component={"p"} sx={{color: location.pathname === item.path ? 'applicationTheme.secondaryColor_1' : "applicationTheme.primaryColor_1"}}   fontSize={"16px"}  >
                                {item.text}
                            </Typography>
                        
                          
                            
                        </MenuItem>
                    ))}
                </Stack>

                

               <Button onClick={handleLogout} sx={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"6px" }}>
                    Logout <LogoutIcon sx={{fontSize:"14px"}}/>
                </Button>
            
            </Box>

            <ThemeToggle />

        </Box> 
       

        <Box display={{xs:'flex', md: 'none'}} component="div" sx={{ justifyContent:'space-between', alignItems:'center', gap:"20px", width:"100%"}} >
                     

        <img
                    src={logo}
                    style={logoStyle}
                    alt="logo of sitemark"
                    onClick={() => navigate('/')}
                /> 

                     <Box component="div"  sx={{ display:'flex', justifyContent:'center', alignItems:'center', gap:"20px"}}>

                        <ThemeToggle />
                        
                        <Button onClick={handleLogout} sx={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"6px", bgcolor:"transparent", color:'applicationTheme.secondary' }}>
                            Logout <LogoutIcon sx={{fontSize:"14px"}}/>
                        </Button>

                     </Box>
                    

           

        </Box>
        </>
    );
}

export default Navbar;
