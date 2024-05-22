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

const logoStyle = {
    width: '100px',
    height: '3.5rem',
    cursor: 'pointer',
};

const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Customer List', icon: <ListIcon />, path: '/customerLists' },
    { text: 'Add Customer', icon: <AddIcon />, path: '/form' },
];

function Navbar({ mode, toggleColorMode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const handleLogout = () => {
        Cookies.remove('token', { path: '/login' });
        dispatch(handleAuth(false));
        navigate('/login');
    };

    return (
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', bgcolor: "applicationTheme.main", padding: '5px 10px', borderRadius: '20px' }}>
            <img
                src={logo}
                style={logoStyle}
                alt="logo of sitemark"
                onClick={() => navigate('/')}
            />

            <Stack flexDirection={'row'} spacing={'20px'} justifyContent={'start'} alignItems={'center'}>
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => navigate(item.path)}
                        className='!m-0'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: location.pathname === item.path ? 'applicationTheme.bgColor' : 'transparent',
                            borderRadius: location.pathname === item.path ? '10px' : '0',
                            padding: '10px 15px',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {item.icon}
                        <Typography variant="body2" fontSize={'15px'} color="applicationTheme.textColor2" sx={{ marginLeft: '5px' }}>
                            {item.text}
                        </Typography>
                    </MenuItem>
                ))}
            </Stack>

            <Button onClick={handleLogout} sx={{ color: 'applicationTheme.textColor', fontSize: '15px', fontWeight: '400', textTransform: 'capitalize', borderRadius: '30px', bgcolor: 'applicationTheme.bgColor', padding: '8px 15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                Logout <LogoutIcon />
            </Button>
        </Box>
    );
}

export default Navbar;
