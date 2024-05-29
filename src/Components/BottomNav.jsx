import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import BallotIcon from '@mui/icons-material/Ballot';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ContactsIcon from '@mui/icons-material/Contacts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { color } from 'framer-motion';

const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'List', icon: <BallotIcon />, path: '/customerLists' },
    { text: 'Add', icon: <GroupAddIcon />, path: '/form' },
    { text: 'Staff', icon: <ContactsIcon />, path: '/staff' },
];

function BottomNav({sx}) {

    const navigate = useNavigate();
    const location = useLocation();

  return (
     <Stack display={{xs:'flex', md:'none'}} direction={'row'} justifyContent={'space-around'} alignItems={'center'} sx={{ width:"100%", backgroundColor:"applicationTheme.primary", borderTopWidth: '0.5px', borderTopStyle:'solid', borderTopColor:"#4d4d4d",padding:"10px 0px" ,...sx}}>
                    {menuItems.map((item, index) => ( 
                        <Box component={'div'}   key={index}   onClick={() => navigate(item.path)} sx={{  display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' , gap:"5px", cursor:'pointer' , padding:"5px 10px" , ['svg']:{ color:  location.pathname === item.path ? 'applicationTheme.secondary' : 'applicationTheme.secondaryColor_2'} , opacity: location.pathname === item.path ? '0.9' : '0.7'}}>
                                     {item.icon}
                                      
                                     <Typography component={'p'} variant='p' sx={{ fontSize:"14px",color:  location.pathname === item.path ? 'applicationTheme.secondary' : 'applicationTheme.secondaryColor_2'}}>
                                            {item.text}
                                     </Typography>
                         </Box> 
                    ))}
     </Stack>
  )
}

export default BottomNav