import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ToggleColorMode from './ToggleColorMode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAuth } from '../Store/Reducers/Reducer';
import Cookies from 'js-cookie';
import logo from '../Assets/logo_transparent.png'
import { Stack } from '@mui/material';

const logoStyle = {
    width: '100px',
    height: '3.5rem',
    cursor: 'pointer',
};

function Navbar({ mode, toggleColorMode }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const handleLogout = () => {
        Cookies.remove('token', { path: '/login' });
        dispatch(handleAuth(false));
        navigate('/login')
    }


    return (
       
            <Box component={'div'} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'100%',bgcolor:"applicationTheme.main",padding:'5px 10px',borderRadius:'20px'}}>

                            <img
                                src={logo}
                                style={logoStyle}
                                alt="logo of sitemark"
                                onClick={() => navigate('/')}
                            />

                            <Stack flexDirection={'row'} spacing={'20px'} justifyContent={'start'} alignItems={'center'} >
                                <MenuItem
                                    onClick={() => navigate('/')}
                                    className='!m-0 '
                                >
                                     
                                    <Typography variant="body2" fontSize={'15px'} color="applicationTheme.textColor2">
                                        Home
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => navigate('/CustomerLists')}
                                    className='!m-0 '
                                >
                                     
                                    <Typography variant="body2" fontSize={'15px'} color="applicationTheme.textColor2">
                                        Customer List
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => navigate('/form')}
                                    className='!m-0 '
                                >
                                    
                                    <Typography variant="body2" fontSize={'15px'} color="applicationTheme.textColor2" >
                                        Add Customer
                                    </Typography>
                                </MenuItem>
                            </Stack>

                                <Button onClick={handleLogout} sx={{color:'applicationTheme.textColor',fontSize:'15px',fontWeight:'400',textTransform:'capitalize',borderRadius:'30px',bgcolor:'applicationTheme.bgColor',padding:'8px 15px',display:'flex',justifyContent:'center',alignItems:'center',gap:'5px'}}>
                                  Logout <i class="bi bi-box-arrow-up-right text-base text-gray-800"></i>
                                </Button>        
            </Box>
       
    );
}

/* Navbar.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
}; */

export default Navbar;