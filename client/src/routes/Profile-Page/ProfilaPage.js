import { Grid, Box, FormControl, List, ListItem, InputLabel, FilledInput, InputAdornment, TextField, MenuItem, Typography, Button, Divider, Avatar, Hidden } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLoaderData } from "react-router";
import { sendIncome } from "../../api/Budget/SendIncome";
import { useState } from "react";
import { useNavigate } from "react-router";
import { sendSpending } from "../../api/Budget/SendSpending";
import girlImage from '../../assets/images/girl.png'
import bulb from '../../assets/images/bulb.png'
import ImageUploadForm from "../../components/Image-Upload-Form/ImageUploadForm";
import { fetchImage } from "../../api/Avatar/Avatar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile } from "../../api/Authorization/Authorization";

const ProfilePage = () => {
    const imageURL = useSelector((state) => state.image.imageURL);
    const {profileData} = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Grid 
            container 
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ 
            height: '100%'
            }}
        >
      {/* BUDGET MAIN CONTAINER */}
        <Grid item xs={4} 
          sx={{
            height: '100%',
            // border:'1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* BUDGET DATA BOX */}
          <Box
            sx={{
                height: '95%',
                width: '95%',
                backgroundImage: 'linear-gradient(0deg, #c2b6df 10%, #cdb2bd 90%)',
                boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: '1px solid rgba(0, 0, 0, 0.25)',
                position: 'relative',
                padding: '1rem',
            }}
            >
            <Typography variant="h4" component="h2" mt={3} mb={3} >
            Профиль суреті
            </Typography>


              {imageURL && (
                <Avatar src={imageURL} sx={{width: 200, height: 200}} />
              )}
            <Box mt={10} sx={{display:"flex", flexDirection:'column', alignItems:"center", height:'50%'}}>      
            <Typography variant="h4" component="h2" mt={3}>
              Профиль Суретін өзгерту
            </Typography>


            <ImageUploadForm/>

            </Box>
            
        </Box>
        </Grid>
        {/* RIGHT CONTAINER */}
        <Grid item xs={5} 
          sx={{ 
            height: '100%',
            // border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          {/* TOP BOX */}
        <Box
          sx={{
              height: '45%',
              width: '80%',
              backgroundColor: 'White',
              boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid rgba(0, 0, 0, 0.25)',
              position: 'relative',
              overflow: 'auto',
              backgroundImage: {girlImage}
          }}
          >
              <Typography variant="h5" fontWeight={800} component="h2" mt={3}>
                  Personal information
              </Typography>

            <Box 
            alignSelf="flex-start"
            ml={8}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            >
              <ul
                style={{
                  listStyleType: 'disc',
                  paddingLeft: '1em',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  height: '100%', // Ensure the <ul> takes the full height available
                }}
              >
                <li>
                  <Typography variant="h6" component="h2">
                    Name: {profileData.name}
                  </Typography>
                </li>
                <li>
                  <Typography variant="h6" component="h2">
                    Surname: {profileData.surname}
                  </Typography>
                </li>
                <li>
                  <Typography variant="h6" component="h2">
                    Email: {profileData.email}
                  </Typography>
                </li>
              </ul>
            </Box>
            
            
        </Box>
          {/* BOTTOM BOX */}
          <Box
              sx={{
                height: '45%',
                width: '80%',
                boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                border: '1px solid rgba(0, 0, 0, 0.25)',
                position: 'relative',

              }}
            >
              {/* BOTTOM INFO */}
                <Box sx={{pl:2}}>

                    <Typography variant="h5" mb={3} mt={3} textAlign="center">
                        Delete Profile
                    </Typography>
                    <Divider/>
                    <Typography variant="h6">
                        Warning: Deleting an account will permanently delete all the personal data
                    </Typography>
                    
                </Box>
                    <Button
                      onClick={(e)=> deleteProfile(e, dispatch, navigate)}
                      variant="contained"
                      size="large"
                      color="error"
                      sx={{alignSelf: 'center'}}
                    >
                      Delete
                    </Button>
              
        
          </Box>
        </Grid>
      </Grid>
      
    )
}
export default ProfilePage;