import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router';
import { useLoaderData } from 'react-router';
import { useEffect } from 'react';
import { fetchImage } from '../../api/Avatar/Avatar';
import { useDispatch } from 'react-redux';
import { fetchImageSuccess } from '../../utils/reducers/auth';
import { fetchAndSetImageURL } from '../../utils/reducers/avatar';
import { useSelector } from 'react-redux';
import { alpha } from '@mui/system'; // Import the alpha function to handle color opacity

export default function MenuAppBar({drawerWidth}) {
  const {avatar} = useLoaderData(); // Avatar from the RootLayout loader
  const imageURL = useSelector((state) => state.image.imageURL);
  const userName = localStorage.getItem('user_name');
  const dispatch = useDispatch();

    useEffect(() => {
        if (avatar) {
          dispatch(fetchAndSetImageURL(avatar.name));
        }
      }, [avatar, dispatch]);

  
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  }

  return (
   
      <AppBar
        
        sx={{
        backgroundImage: 'linear-gradient(151deg, #c2b6df 29%, #cdb2bd 70%)',
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: 'primary.lighter',
        color: 'black',
        borderLeft: '1px solid white'
      }}
      >
        <Toolbar sx={{
          display: 'flex', 
          alignItems:'center',
          justifyContent: 'flex-end'
        }}>
              <Typography variant="h6" fontWeight={700} mr={3}>  {userName}</Typography>
              <Avatar 
                src={imageURL}
                onClick={handleMenu}   
                sx={{
                  width: 56,
                  height: 56,
                  cursor: 'pointer', // Change the cursor to a pointer on hover
                  '&:hover': {
                    borderColor: 'green', // Set the border color to green on hover
                    borderWidth: '2px', // Set the border width
                    borderStyle: 'solid', // Set the border style
                    boxShadow: `0 0 0 4px ${alpha('#00ff00', 0.5)}`, // Add a green glow around the avatar on hover
                  },
                }}
              />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              </Menu>
           
        </Toolbar>
      </AppBar>
  );
}