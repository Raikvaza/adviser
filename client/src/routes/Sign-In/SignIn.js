import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useDispatch } from 'react-redux';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { handleLogin } from "../../api/Authorization/Authorization";
import CustomError from "../Error-Page/CustomError";
import { useLocation } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    
    // const userData = useSelector((state) => state.auth.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const errorFromRoute = location.state?.error; // Error after navigate()
    const statusFromRoute = location.state?.success; // Success after sign up navigate()
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleStatus = () => {
        if (status){
            return (  
                <Alert severity="error">
                    {status}
                </Alert>
            )
        } else if (errorFromRoute){
          return (
            <Alert severity="error">
                {errorFromRoute.message || errorFromRoute.status}
            </Alert>
        )
        } else if (statusFromRoute){
          return (  
            <Alert severity="success">
                Successfully created an account!
            </Alert>
        )
        }
        
    }
    if (error){
      return <CustomError error={error}/>
    }
    return (
        <Container component="main" maxWidth="xs" 
            sx={{
                backgroundColor:'white',
                borderRadius:'10px',
            }}
        >
        <Box
          sx={{  
            mt: 20,
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{color:'black', fontFamily:'Dosis', letterSpacing:'5px', fontWeight:'700'}}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={(e) => {handleLogin(e, email, password, dispatch, navigate, setStatus, setError)}} noValidate sx={{ mt: 6 }}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              autoFocus
            />
            
            <FormControl 
            variant="outlined"
            margin="normal"
            fullWidth
            >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                required
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {setPassword(e.target.value)}}
                value={password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            
              <Typography component="h1" variant="h5" sx={{color:'black'}}>
                {handleStatus()}
            </Typography>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
                
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    
    )
}

export default Login;