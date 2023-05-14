import { Grid, Box, FormControl, List, ListItem, InputLabel, FilledInput, InputAdornment, TextField, MenuItem, Typography, Button, Divider } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLoaderData } from "react-router";
import { sendIncome } from "../../api/Budget/SendIncome";
import { useState } from "react";
import { useNavigate } from "react-router";
import { sendSpending } from "../../api/Budget/SendSpending";
import girlImage from '../../assets/images/girl.png'
import bulb from '../../assets/images/bulb.png'
const AboutUsPage = () => {
    
    return (
        <Grid 
            container 
            alignItems="center"
            sx={{ 
            height: '100%'
            }}
        >
      {/* BUDGET MAIN CONTAINER */}
        <Grid item xs={7} 
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
                justifyContent: 'space-evenly',
                border: '1px solid rgba(0, 0, 0, 0.25)',
                position: 'relative',
                padding: '1rem',
            }}
            >
            <Typography variant="h4" component="h2">
              Қосымша туралы
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', justifyContent: 'space-around' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <svg fill="#000000" width="89px" height="89px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10.594 1.975a8 8 0 0 1 1.895.795 7.857 7.857 0 0 1 1.604 1.237 8.05 8.05 0 0 1 1.241 1.6 7.909 7.909 0 0 1 0 7.991 8.021 8.021 0 0 1-2.845 2.845 7.888 7.888 0 0 1-4.007 1.082 7.825 7.825 0 0 1-3.985-1.082 8.039 8.039 0 0 1-1.599-1.241 7.848 7.848 0 0 1-1.237-1.604 8 8 0 0 1-.795-1.895 7.86 7.86 0 0 1-.283-2.112 7.782 7.782 0 0 1 .283-2.098 7.902 7.902 0 0 1 5.518-5.518 7.764 7.764 0 0 1 2.098-.283 7.848 7.848 0 0 1 2.112.283zM6.682 3.043A6.793 6.793 0 0 0 1.933 7.79a6.688 6.688 0 0 0-.241 1.8 6.764 6.764 0 0 0 .242 1.815 6.915 6.915 0 0 0 .685 1.634 6.775 6.775 0 0 0 1.063 1.378 6.975 6.975 0 0 0 1.38 1.071 6.822 6.822 0 0 0 5.235.686 6.789 6.789 0 0 0 3.012-1.757 6.925 6.925 0 0 0 1.07-1.382 6.785 6.785 0 0 0 .93-3.445 6.722 6.722 0 0 0-.929-3.42 6.967 6.967 0 0 0-1.07-1.38 6.77 6.77 0 0 0-1.38-1.063 6.936 6.936 0 0 0-1.633-.685A6.775 6.775 0 0 0 8.482 2.8a6.695 6.695 0 0 0-1.8.243zm2.84 10.095V6.58H8.106L5.948 8.164l.806 1.103 1.222-.945v4.816z"></path></g>
                    </svg>
                    <Typography variant="h6" sx={{flexShrink:"100", lineHeight:"35px"}}>
                    Қосымшаның басты мақсаты - қоғамның барлық салаларындағы адамдарға жоғары сапалы қаржы кеңестерін демократизациялап қолжетімді етіп, олардың қаржылық мақсаттарына жету жолында өз үлесін қосу. Күрделі қаржылық тұжырымдамаларды жеңілдететін ыңғайлы платформа құруға тырысатын боламын.                     </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'right' }}>
                <Typography variant="h6" sx={{flexShrink:"100", lineHeight:"35px"}}>
                Қолданушыларға қаржыға негізделген тиімді шешімдерді қабылдауы үшін түрлі құнды ресурстарды ұсынып, олардың қаржылық сауаттылығының артуына себепкер болуға тырысатын боламын. Жобаның миссиясы - адамдардың жеке қаржыға деген көзқарасын өзгерту және мықты қаржылық фундаменттің қалыптасуына ықпал ету.                </Typography>
                <svg fill="#000000" width="89px" height="89px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10.594 1.975a8 8 0 0 1 1.895.795 7.857 7.857 0 0 1 1.604 1.237 8.05 8.05 0 0 1 1.241 1.6 7.909 7.909 0 0 1 0 7.991 8.021 8.021 0 0 1-2.845 2.845 7.888 7.888 0 0 1-4.007 1.082 7.825 7.825 0 0 1-3.985-1.082 8.039 8.039 0 0 1-1.599-1.241 7.848 7.848 0 0 1-1.237-1.604 8 8 0 0 1-.795-1.895 7.86 7.86 0 0 1-.283-2.112 7.782 7.782 0 0 1 .283-2.098 7.902 7.902 0 0 1 5.518-5.518 7.764 7.764 0 0 1 2.098-.283 7.848 7.848 0 0 1 2.112.283zM6.682 3.043A6.793 6.793 0 0 0 1.933 7.79a6.688 6.688 0 0 0-.241 1.8 6.764 6.764 0 0 0 .242 1.815 6.916 6.916 0 0 0 .685 1.634 6.775 6.775 0 0 0 1.063 1.378 6.975 6.975 0 0 0 1.38 1.071 6.822 6.822 0 0 0 5.235.686 6.789 6.789 0 0 0 3.012-1.757 6.924 6.924 0 0 0 1.07-1.382 6.785 6.785 0 0 0 .93-3.445 6.722 6.722 0 0 0-.929-3.42 6.967 6.967 0 0 0-1.07-1.38 6.77 6.77 0 0 0-1.38-1.063 6.937 6.937 0 0 0-1.633-.685A6.775 6.775 0 0 0 8.482 2.8a6.695 6.695 0 0 0-1.8.243zm4.176 10.095v-1.352H8.18l1.52-1.353q.222-.203.43-.412a2.996 2.996 0 0 0 .371-.449 2.115 2.115 0 0 0 .255-.523 2.028 2.028 0 0 0 .092-.635 1.89 1.89 0 0 0-.199-.889 1.853 1.853 0 0 0-.532-.63 2.296 2.296 0 0 0-.76-.37 3.23 3.23 0 0 0-.88-.12 2.854 2.854 0 0 0-.912.144 2.376 2.376 0 0 0-.764.42 2.315 2.315 0 0 0-.551.666 2.346 2.346 0 0 0-.273.89l1.491.204a1.232 1.232 0 0 1 .292-.717.893.893 0 0 1 1.227-.057.76.76 0 0 1 .222.57 1 1 0 0 1-.148.535 2.418 2.418 0 0 1-.389.472l-2.556 2.311v1.295z"></path></g>
                </svg>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <svg fill="#000000" width="89px" height="89px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10.598 1.958a7.948 7.948 0 0 1 5.536 5.535 7.956 7.956 0 0 1 0 4.206 7.863 7.863 0 0 1-2.04 3.49 8.081 8.081 0 0 1-1.605 1.237 7.914 7.914 0 0 1-1.89.8 7.965 7.965 0 0 1-4.207 0 7.934 7.934 0 0 1-5.526-5.527 7.99 7.99 0 0 1 0-4.21 7.94 7.94 0 0 1 .8-1.887A8.05 8.05 0 0 1 2.902 4 7.86 7.86 0 0 1 8.5 1.675a7.77 7.77 0 0 1 2.098.283zM6.691 3.025A6.753 6.753 0 0 0 3.688 4.78a6.987 6.987 0 0 0-1.067 1.384 6.847 6.847 0 0 0-.688 1.624 6.872 6.872 0 0 0 0 3.613 6.811 6.811 0 0 0 .688 1.627 6.824 6.824 0 0 0 4.07 3.13 6.857 6.857 0 0 0 3.609 0 6.855 6.855 0 0 0 1.628-.688 7.011 7.011 0 0 0 1.384-1.067 6.754 6.754 0 0 0 1.754-3.002 6.847 6.847 0 0 0 0-3.61 6.834 6.834 0 0 0-.687-1.627 6.92 6.92 0 0 0-2.452-2.452 6.84 6.84 0 0 0-1.627-.687 6.847 6.847 0 0 0-3.61 0zm4.19 7.668a1.529 1.529 0 0 0-.26-.444 1.647 1.647 0 0 0-.398-.342 1.69 1.69 0 0 0-.509-.208V9.67a1.51 1.51 0 0 0 .792-.505 1.402 1.402 0 0 0 .31-.923 1.626 1.626 0 0 0-.199-.821 1.814 1.814 0 0 0-.523-.58 2.282 2.282 0 0 0-.736-.344 3.251 3.251 0 0 0-.848-.11 3.01 3.01 0 0 0-.797.106 2.625 2.625 0 0 0-.717.315 2.222 2.222 0 0 0-.57.518 2.142 2.142 0 0 0-.361.728l1.445.333a.92.92 0 0 1 .32-.533.891.891 0 0 1 .578-.199.936.936 0 0 1 .574.187.633.633 0 0 1 .25.54.654.654 0 0 1-.356.63 1.128 1.128 0 0 1-.366.12 2.706 2.706 0 0 1-.426.033H7.63v1.13h.417a2.816 2.816 0 0 1 .481.042 1.488 1.488 0 0 1 .43.138.821.821 0 0 1 .307.264.714.714 0 0 1 .115.417.789.789 0 0 1-.087.389.776.776 0 0 1-.223.255.93.93 0 0 1-.305.143 1.292 1.292 0 0 1-.339.047 1.085 1.085 0 0 1-.731-.246 1.163 1.163 0 0 1-.38-.57l-1.445.38a2.186 2.186 0 0 0 .996 1.33 2.723 2.723 0 0 0 .769.31 3.665 3.665 0 0 0 .866.101 3.26 3.26 0 0 0 .893-.124 2.506 2.506 0 0 0 .792-.38 1.958 1.958 0 0 0 .57-.647 1.89 1.89 0 0 0 .218-.93 1.462 1.462 0 0 0-.093-.522z"></path></g>
                    </svg>
                    <Typography variant="h6" sx={{flexShrink:"100", lineHeight:"35px"}}>
                    Қосымша үнемі жаңарып отыратын қызметтердің болуы арқасында алдыңғы қатарлы қосымша болып қала беру мүмкіндігіне ие. Сонымен қатар, қолданушыларға қаржыны басқарудың ең тиімді құралдары мен стратегияларын ұсына отырып, жаңа технологияларды дамытуға және дамып келе жатқан үрдістерге жылдам бейімделуге тырысатын боламын.                    </Typography>
                </Box>
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
                flexDirection: 'row',
                alignItems: 'flex-end',
                border: '1px solid rgba(0, 0, 0, 0.25)',
                position: 'relative',
            }}
            >
            <img
                src={girlImage}
                alt="image"
                style={{
                marginBottom: 0, // Add this property
                marginLeft: 0, 
                maxWidth: '80%',
                maxHeight: '80%',
                objectFit: 'contain',
                }}
            />
            <Box sx={{alignSelf:'center', flexGrow: "0.9"}}>

            <Typography variant="h5" mb={3} mt={3} textAlign="center">
                Мен жайлы
            </Typography>
            <Divider/>
            <List sx={{ listStyleType: 'disc', pl: 4 , fontSize:'1.2rem'}}>
                <ListItem sx={{ display: 'list-item' }}>Улдана</ListItem>
                <ListItem sx={{ display: 'list-item' }}>ENU</ListItem>
                <ListItem sx={{ display: 'list-item' }}>ВТиПО 43</ListItem>
                <ListItem sx={{ display: 'list-item' }}>Full Stack</ListItem>
            </List>
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
                flexDirection: 'row',
                alignItems: 'flex-end',
                border: '1px solid rgba(0, 0, 0, 0.25)',
                position: 'relative',

              }}
            >
              {/* BOTTOM INFO */}
                <Box sx={{pl:2,alignSelf:'center', flexGrow: "0.9"}}>

                    <Typography variant="h5" mb={3} mt={3} textAlign="center">
                      Қолданылған технологиялар
                    </Typography>
                    <Divider/>
                    <List sx={{ listStyleType: 'disc', pl: 4 , fontSize:'1.2rem'}}>
                        <ListItem sx={{ display: 'list-item' }}>Nivo Charts</ListItem>
                        <ListItem sx={{ display: 'list-item' }}>React Calendar</ListItem>
                        <ListItem sx={{ display: 'list-item' }}>SQLite</ListItem>
                        <ListItem sx={{ display: 'list-item' }}>Golang</ListItem>
                        <ListItem sx={{ display: 'list-item' }}>React</ListItem>
                    </List>
                </Box>
              <img
                src={bulb}
                alt="image"
                style={{
                marginBottom: 0, // Add this property
                marginRight: 0, 
                maxWidth: '70%',
                maxHeight: '70%',
                objectFit: 'contain',
                }}
            />
        
          </Box>
        </Grid>
      </Grid>
      
    )
}
export default AboutUsPage;