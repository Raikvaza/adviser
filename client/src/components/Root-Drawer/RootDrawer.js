import { List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar, Box, Typography, Button } from '@mui/material';
import { Dashboard as DashboardIcon, BarChart as BarChartIcon, AttachMoney as AttachMoneyIcon, EventNote as EventNoteIcon, CreditCard as CreditCardIcon, Settings as SettingsIcon, Info as InfoIcon, Mail as MailIcon } from '@mui/icons-material';
import {Divider} from '@mui/material';
import {ListItemButton} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOutHandler } from '../../api/Authorization/Authorization';
import { useDispatch } from 'react-redux';
import Amiyan from '../../assets/images/Amiyan.png'

export const MainDrawer = ({path}) =>{
  const menuItems = [
    { text: 'Statistics', textKz: 'Статистика' },
    { text: 'Budget', textKz: 'Бюджет' },
    { text: 'Planner', textKz: 'Жоспарлау' },
    { text: 'Debt', textKz: 'Қарыздар' },
  ];
  const lowerMenuItems = [
    
    { text: 'About Us', textKz: 'Қосымша туралы' },
    { text: 'Contacts', textKz: 'Байланысу' },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNav = (item) => {
    const newPath = item.text.replace(/\s/g, ''); // Removing spaces from a button text
    navigate(`/${newPath.toLowerCase()}`); // changing the url to the specified nav button text
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%', // Make sure the Box component expands to the full height of its container
      }}
    >
      <Box>
      <Box
      sx={{
        height: 150,
        width: '100%',
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        borderBottom: '3px solid white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <img
        src={Amiyan}
        onClick={()=> {navigate("/")}}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: 1, // Reset the default border-radius of Avatar
          
        }}
      />
    
        
      </Box>
        {/* <Toolbar /> */}
        {/* <Divider /> */}
        <List >
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNav(item)}
                  sx={{
                    backgroundColor: (item.text.toLowerCase().replace(/\s/g, '') === path.toLowerCase().replace(/\s/g, '')) && "primary.light",
                    border: "1px solid transparent",
                    borderColor: (item.text.toLowerCase().replace(/\s/g, '') === path.toLowerCase().replace(/\s/g, '')) ? "black transparent black black" : "none",
                    // my: 1,
                    py: 2,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                > 
                  <ListItemIcon>
                  {index % 2 === 0 ? <InfoIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.textKz} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {lowerMenuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNav(item)}
                sx={{
                  backgroundColor: (item.text.toLowerCase().replace(/\s/g, '') === path.toLowerCase().replace(/\s/g, '')) && "primary.light",
                  border: "1px solid transparent",
                  borderColor: (item.text.toLowerCase().replace(/\s/g, '') === path.toLowerCase().replace(/\s/g, '')) ? "black transparent black black" : "none",
                    // marginY: 1,
                  py: 2,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                  <ListItemIcon>
                  {index % 2 === 0 ? <InfoIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.textKz} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Box>
        
        <Box
        onClick={() => signOutHandler(dispatch, navigate)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 6,
          "&:hover": {
            color: "aliceblue",
            cursor: "pointer"
          },
          "&:active":{
            color: "#FF2020",
          }
        }}
        >
        
        <LogoutIcon fontSize='large'/><Typography variant="h6" > Шығу</Typography>
        
        </Box>
      </Box>
    );
} 