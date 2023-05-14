import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, Avatar } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import RootDrawer from '../../components/Root-Drawer/RootDrawer';
import { MainDrawer } from '../../components/Root-Drawer/RootDrawer';
import { Search } from '@mui/icons-material';
import {InputBase} from '@mui/material';
import { useSelector } from 'react-redux';
import MenuAppBar from '../../components/Appbar/Appbar';
import { useRef, useEffect, useState } from 'react';

const drawerWidth = 240;

const RootLayout = () => {
  const username = useSelector((state) => state.auth.username)
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const boxRef = useRef(null); // for height measurement
  const barRef = useRef(null);
  const [boxHeight, setBoxHeight] = useState()
  const [barHeight, setBarHeight] = useState()
  
  useEffect(() => {
    setBoxHeight(boxRef.current.offsetHeight)
    setBarHeight(barRef.current.offsetHeight)
    // console.log(`Box height: ${boxHeight}px`);
    // console.log(`Toolbar height: ${barHeight}px`);
  }, []);
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor:"primary.light"}}>
      <CssBaseline />
      {/* APPBAR */}
        <MenuAppBar drawerWidth={drawerWidth}/>
        {/* DRAWER */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="Navigation-Bar"
      >
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: "linear-gradient(0deg, #cdb2bd 10%, #c2b6df 90%)",
            border: "none"
          },
        
        }}
        variant="permanent"
        anchor="left"
      >
          <MainDrawer path={path}/>
        </Drawer>
      </Box>
      {/* MAIN */}
      <Box component="main" sx={{flexGrow: 1, pt: 2, maxHeight: boxHeight-barHeight}} ref={boxRef} >
        <Toolbar ref = {barRef}/>
        <Outlet/>
      </Box>
    </Box>
  );
};

export default RootLayout;

