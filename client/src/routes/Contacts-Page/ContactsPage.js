import { Grid, Box,Divider, FormControl, InputLabel, FilledInput, InputAdornment, TextField, MenuItem, Typography, Button, Link } from "@mui/material";
import contacts from '../../assets/images/contacts-back.png'
import git from '../../assets/images/git.png'
import facebook from '../../assets/images/facebook.png'
import insta from '../../assets/images/insta.png'
import twitter from '../../assets/images/twitter.png'
import linkedIn from '../../assets/images/linkedinn.png'
import contact from '../../assets/images/contact.png'
import map from '../../assets/images/map.png'

const ContactsPage = () => {
    // ???????????asdasd????
    return (
        <Grid container direction="row" sx={{ height: '100%' }}>
        {/* Full width grid item */}
        <Grid item xs={12} sx={{ height: '20%' }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h2" textAlign="center">
                Кері әрдайым байланысқа ашықпыз
            </Typography>
            <Typography variant="h6" textAlign="center">
                Кез-келген уақытта өз усынысыңызды ыңғайлы әдіспен білдіре аласыз
            </Typography>
        </Grid>
  
        {/* 3 grid items side by side */}
    <Grid item container xs={12} sx={{ height: '80%' }} direction="row">
      <Grid item xs={4} 
          sx={{
            height: '100%',
            // border:'1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            {/* LEFT BOX */}
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
                <Box 
                sx={{
                    height: "10%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center'
                }}>
                    <Typography variant="h4">Мекен-жайымыз</Typography>
                </Box>
                
                <Box 
                sx={{
                    height: '85%',
                    width: '100%',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center'
                }}>


                    <Typography variant="h6">Kazakhstan, Astana city, Mangilik El, C4.5</Typography>
                    
                    <img
                        src={map}
                        alt="image"
                        style={{
                        // position: "absolute", // Move position property here
                        // bottom: '50%',
                        // left: '50%',
                        marginTop: '100px',
                        maxWidth: '70%',
                        maxHeight: '70%',
                        opacity: '0.70',
                        //transform: 'translate(-50%, 50%)', // Add this line to center the image
                        }}
                    />
                </Box>
                
            </Box>
        </Grid>
        <Grid item xs={4} 
        sx={{
            height: '100%',
            // border:'1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            {/* MIDDLE BOX */}
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
        }}>
            {/* MIDDLEBOX HEADER */}
            <Box 
                sx={{
                    height: "10%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center'
                }}
            >
                <Typography variant="h4" sx={{flexGrow:1}}>
                    Қолдау көрсету қызметі
                </Typography>
            </Box>
            {/* MIDDLEBOX DATA */}
            <Box 
            sx={{
                height: '85%',
                width: '100%',
                display: "flex",
                flexDirection: "column",
                alignItems: 'center'
            }}>
                <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <img 
                    src={contact}
                    alt="image"
                    style={{
                        width: '30px',
                        height: '30px',
                        opacity: 0.6,
                        marginRight: '8px',
                    }}
                    />
                    <Typography variant="h5">
                        +7-708-256-99-01
                    </Typography>
                </Box>
                    <img
                    src={contacts}
                    alt="image"
                    style={{
                        //position: "absolute", // Move position property here
                        //bottom: '50%',
                        //left: '50%',
                        marginTop: '100px',
                        maxWidth: '70%',
                        maxHeight: '70%',
                        opacity: '0.6',
                        //transform: 'translate(-50%, 50%)' // Add this line to center the image
                    }}
                    />
                </Box>  
        </Box>
        </Grid>
          <Grid item xs={4}
            sx={{
                height: '100%',
                // border:'1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
          >
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
            <Box 
                sx={{
                    height: "10%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center'
                }}>

                <Typography variant="h4">Байланысу әдістері</Typography>
            </Box>
            
            
            <Box 
            ml={7}
            sx={{
                height: '85%',
                width: '100%',
                display: "flex",
                flexDirection: "column",
                alignItems: 'flex-start',
                justifyContent: 'space-evenly',
            }}>
                <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <img
                src={git}
                alt="My Image"
                style={{
                    opacity: 0.8,
                    width: '60px',
                    height: '60px',
                    marginRight: '8px',
                }}
                />
                <Link color="black" href="https://github.com/Danabananaa" underline="hover" sx={{"&:hover": {color:"white"}, paddingLeft: "20px", fontSize:"25px"}}>Git Hub</Link>
            </Box>

            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <img
                src={linkedIn}
                alt="My Image"
                style={{
                    opacity: 0.6,
                    width: '60px',
                    height: '60px',
                    marginRight: '8px',
                }}
                />
                <Link color="black" href="https://linkedin.com/in/uldana-manas-40a073224" underline="hover" sx={{"&:hover": {color:"white"}, paddingLeft: "20px", fontSize:"25px"}}>Linked In </Link>
            </Box>
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <img
                src={facebook}
                alt="My Image"
                style={{
                    opacity: 0.8,
                    width: '60px',
                    height: '60px',
                    marginRight: '8px',
                }}
                />
                <Link color="black" href="#" underline="hover" sx={{"&:hover": {color:"white"}, paddingLeft: "20px", fontSize:"25px"}}>Facebook </Link>
            </Box>
            
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <img
                src={twitter}
                alt="My Image"
                style={{
                    opacity: 0.8,
                    width: '60px',
                    height: '60px',
                    marginRight: '8px',
                }}
                />
                <Link color="black" href="#" underline="hover" sx={{"&:hover": {color:"white"}, paddingLeft: "20px", fontSize:"25px"}}> Twitter </Link>
            </Box>
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <img
                src={insta}
                alt="My Image"
                style={{
                    opacity: 0.6,
                    width: '60px',
                    height: '60px',
                    marginRight: '8px',
                }}
                />
                <Link color="black" href="https://instagram.com/__danatella_" underline="hover" sx={{"&:hover": {color:"white"}, paddingLeft: "20px", fontSize:"25px"}}>Instagram </Link>
            </Box>
            </Box>

        </Box>
        </Grid>
        </Grid>
      </Grid>
          )
}
export default ContactsPage;