import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import BallotIcon from '@mui/icons-material/Ballot';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ContactsIcon from '@mui/icons-material/Contacts';
import { useLocation, useNavigate } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';

const menuItems = [
    { text: 'Home', icon: <HomeIcon sx={{fontSize:"20px"}} />, path: '/' },
    { text: 'List', icon: <BallotIcon sx={{fontSize:"20px"}} />, path: '/customerLists' },
    { text: 'Transaction', icon: <PaidIcon sx={{fontSize:"50px", position:'absolute', top:'-20px', color:"red"}} />, path: '/Transaction' },
    { text: 'Add', icon: <GroupAddIcon sx={{fontSize:"20px"}} />, path: '/form' },
    { text: 'Staff', icon: <ContactsIcon  sx={{fontSize:"20px"}} />, path: '/staff' },
];

function BottomNav({sx}) {

    const navigate = useNavigate();
    const location = useLocation();

  return (
     <Stack display={{xs:'flex', md:'none'}} direction={'row'} justifyContent={'space-around'} alignItems={'center'} sx={{ width:"100%", backgroundColor:"applicationTheme.primary", borderTopWidth: '0.5px', borderTopStyle:'solid', borderTopColor:"gray", height:"58px",padding:"0px 0px" ,...sx}}>
                    {menuItems.map((item, index) => ( 
                        <Box component={'div'}   key={index}   onClick={() => navigate(item.path)} sx={{  display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' , gap:"2px", cursor:'pointer' , padding:"5px 10px" , ['svg']:{ bgcolor:item.text === 'Transaction' && 'white' ,borderTopWidth:'1px',borderTopStyle:'solid',borderTopColor:"gray",  borderTopLeftRadius:"30px",  borderTopRightRadius:"30px", color: item.text === 'Transaction' ? 'applicationTheme.main' :  location.pathname === item.path ? 'applicationTheme.secondary' : 'applicationTheme.secondaryColor_2'} , opacity:  item.text === 'Transaction' ? '10' : location.pathname === item.path ? '0.9' : '0.7'}}>
                                     {item.icon}
                                      
                                     <Typography component={'p'} sx={{marginTop:  item.text === 'Transaction' && '25px' , fontSize:"12px",color:  location.pathname === item.path ? 'applicationTheme.secondary' : 'applicationTheme.secondaryColor_2'}}>
                                            {item.text}
                                     </Typography>
                         </Box> 
                    ))}
     </Stack>
  )
}

export default BottomNav