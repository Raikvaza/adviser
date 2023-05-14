import { Grid, Box, Typography, Button, FormControl, InputLabel, FilledInput, InputAdornment, TextField, MenuItem } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router";
import PlannerTable from "../../components/Planner-Table/PlannerTable";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import { sendAmount } from "../../api/Planner/SendAmount";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const PlannerPage = () => {
    const {Types, Stats} = useLoaderData();
    const [spendingType, setSpendingType] = useState(Types[0].ID);
    const [spendingAmount, setSpendingAmount] = useState();
    const navigate = useNavigate();
     //ALERT WINDOWS
     const [open, setOpen] = useState(false);

     const handleClickOpen = () => {
       setOpen(true);
     };
 
     const handleClose = () => {
       setOpen(false);
     };
 
return (
    
    <Grid 
        container 
        alignItems="center"
        sx={{ 
        height: '100%'
        }}
    >

  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="Wrong Input"
  >
    <DialogTitle id="alert-dialog-title">
      {"Деректер қатесі"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      Дұрыс емес деректер. Қайта толтырып көріңіз
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="contained" onClick={handleClose} autoFocus sx={{border: "1px solid black"}}>
        Түсіндім
      </Button>
    </DialogActions>
  </Dialog>
  {/* BUDGET MAIN CONTAINER */}
    <Grid item xs={7} 
      sx={{
        height: '95%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
    >
      {/* BUDGET DATA BOX */}
      
      <Box
        sx={{
          height: '100%',
          width: '95%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
          {/* TABLE */}

        <PlannerTable typesData={Types} data = {Stats}/>

      </Box>
    </Grid>
    {/* RIGHT CONTAINER */}
    <Grid item xs={5} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}
    >
      {/* TOP BOX */}
      <Box
        component="form"
        sx={{
          height: '45%',
          width: '80%',
          backgroundImage: 'linear-gradient(0deg, #c2b6df 10%, #cdb2bd 90%)',
          boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.25)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          border: '1px solid rgba(0, 0, 0, 0.25)',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (/^[1-9]\d{0,20}$/.test(spendingAmount) && spendingType) { //CHECK DATA VALIDITY
            sendAmount(spendingType, spendingAmount, navigate); // SEND DATA TO BACKEND
          } else {
            handleClickOpen(); // Open Alert Window
          }
        }}
      >
  {/* TOP HEADER */}
  <Typography variant="h4">Жаңа шектеме</Typography>
  {/* TOP SELECT TYPE */}
  <TextField
    id="outlined-select-currency"
    variant="filled"
    select
    label="Таңдау"
    onChange={(e) => {
      setSpendingType(e.target.value);
      console.log(spendingType);
    }}
    value={spendingType}
    required={true}
    sx={{ width: '80%' }}
  >
    {Types &&
      Types.map((option) => (
        <MenuItem key={option.ID} value={option.ID}>
          {option.SpendingType}
        </MenuItem>
      ))}
  </TextField>

  {/* TOP AMOUNT */}
  <FormControl sx={{ width: '80%' }} variant="filled" required={true}>
    <InputLabel htmlFor="filled-adornment-amount">Сумма</InputLabel>
    <FilledInput
      id="filled-adornment-amount"
      onChange={(e) => setSpendingAmount(e.target.value)}
      inputProps={{ maxLength: 15 }}
      startAdornment={<InputAdornment position="start">₸</InputAdornment>}
    />
  </FormControl>

  {/* TOP BUTTON */}
  <Button
    type="submit"
    sx={{
      fontSize: '50px',
      '&:hover': {
        cursor: 'pointer',
      },
      bgcolor: 'transparent',
      border: 'none',
      borderRadius: '100%',
      padding: 0,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <AddCircleOutlineIcon 
      sx={{ 
        fontSize: '50px',
        color: 'black',
        '&:hover': {
          color:"white"
        }
      }}
    />
  </Button>
</Box>
    {/* BOTTOM BOX */}
    <Box
        sx={{
          height: '45%',
          width: '80%',
          backgroundImage: 'linear-gradient(0deg, #c2b6df 10%, #cdb2bd 90%)',
          boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          border: '1px solid rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* BOTTOM HEADER */}
          <Typography variant="h4">
            Нұсқаулық
          </Typography>

          <Typography variant="h6" textAlign="center" sx={{px:"50px"}}>
          Жоспарлау бетін әртүрлі шығындарыңыздың айлық мөлшерін шектеп отыру үшін қолданыңыз. 
          Жоспарлау сізге өзіңіздің қаржыңызды сауатты жұмсауға көмектеседі
          </Typography>
    </Box>
  </Grid>
</Grid>

    )
}
export default PlannerPage;