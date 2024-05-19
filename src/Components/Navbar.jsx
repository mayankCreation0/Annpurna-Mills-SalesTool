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
import { handleAuth } from '../Redux/Reducer';
import Cookies from 'js-cookie';
import logo from '../Assets/ams-high-resolution-logo-normal.png'

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
        <div>
            <AppBar
                maxwidth="100%"
                sx={{
                    boxShadow: 0,
                    // bgcolor: 'coral',
                    backgroundImage: 'none',
                }}
            >
                <Container maxwidth="100%">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <img
                                src={logo}
                                style={logoStyle}
                                alt="logo of sitemark"
                                onClick={() => navigate('/')}
                            />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <MenuItem
                                    onClick={() => navigate('/CustomerLists')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <PeopleIcon />
                                    <Typography variant="body2" color="text.primary">
                                        Customer List
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => navigate('/form')}
                                    sx={{ py: '6px', px: '12px' }}
                                >
                                    <AddCircleIcon />
                                    <Typography variant="body2" color="text.primary">
                                        Add Customer
                                    </Typography>
                                </MenuItem>
                            </Box>

                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                component="a"
                                onClick={() => handleLogout()}
                                target="_blank"
                            >
                                Log out
                            </Button>
                        </Box>
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                    </Box>
                                    <MenuItem onClick={() => navigate('/CustomerLists')}>
                                        Customer List
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/form')}>
                                        Add Customer
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                            component="a"
                                            onClick={() => handleLogout()}
                                            target="_blank"
                                        >
                                            Log out
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;