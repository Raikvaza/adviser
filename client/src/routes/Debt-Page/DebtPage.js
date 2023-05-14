import { Grid, Box, FormControl, Stack, InputLabel, FilledInput, InputAdornment, TextField, MenuItem, Typography, Button } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import MyCalendar from "../../components/Calendar/Calendar";
import "react-calendar/dist/Calendar.css";
import Calendar from 'react-calendar';
import '../../components/Calendar/Calendar.css'
import { useLoaderData, useNavigate } from "react-router";
import { sendDebt } from "../../api/Debt/SendDebt";
import DebtTable from "../../components/Debt-Table/DebtTable";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const mergeAndSortDebtsLoansByDate = (debtArray, loanArray) => {
  const debtData = debtArray.length > 0 ? debtArray.map((item) => ({
    ID: 'debt_'+item.id,
    date: item.date,
    description: item.description,
    amount: item.amount,
    type_id: item.type_id,
    type: "Debt",
    status: item.status,
  })) : [];

  const loanData = loanArray.length > 0 ? loanArray.map((item) => ({
    ID: 'loan_' + item.id,
    date: item.date,
    description: item.description,
    amount: item.amount,
    type_id: item.type_id,
    type: "Loan",
    status: item.status,
  })) : [];

  const mergedArray = [...debtData, ...loanData];

  return mergedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const DebtPage = () => {
    const navigate = useNavigate();
    // DATA
    const {debtData, debtTypesData} = useLoaderData();
    const [date, setDate] = useState(new Date());
    const [debtLoan, setDebtLoan] = useState('');
    const [debtType, setDebtType] = useState('');
    const [amount, setAmount] = useState();
    const [debtDescription, setDebtDescription] = useState('');
    const mergedData = mergeAndSortDebtsLoansByDate(debtData.DebtArr, debtData.LoanArr);
    
    //FILTERS
    const periods = [
      { kazakh: 'Жыл', english: 'year' },
      { kazakh: 'Ай', english: 'month' },
      { kazakh: 'Апта', english: 'week' },
      { kazakh: 'Күн', english: 'day' },
    ];
    const query = new URLSearchParams(location.search);
    //FILTER buttons
  const handleButtonClick = (e, value) => {
    // e.preventDefault();
    if (value) {
      // Update the URL with the new page number
      const newQuery = new URLSearchParams(query);
      newQuery.set('filter', value);
      navigate({ search: newQuery.toString() }); // navigate to update state values with useEffect
    } 
  };
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
{/* Диалог отвечает за всплывающее окно при ошибке или неверных введеных данных */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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

      {/* DEBT MAIN CONTAINER */}
        <Grid item xs={7} 
          sx={{
            height: '100%',
            // border:'1px solid black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          
        <Box
          sx={{
            height: '5%',
            width: '95%',
            // backgroundImage: 'linear-gradient(0deg, #c2b6df 10%, #cdb2bd 90%)',
            // boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // border: '1px solid rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}
        >
        <Stack direction="row" spacing={5}>
          {periods.map((period) => (
            <Button
              key={period.english}
              variant="contained"
              color="secondary"
              onClick={(e) => handleButtonClick(e, period.english)}
              sx={{ border: '1px solid black', fontWeight: '600', color: '#0C1017', width: '100px' }}
            >
              {period.kazakh}
            </Button>
          ))}
        </Stack>

      </Box>
          
          {/* DEBT DATA BOX */}
          <Box
            sx={{
              height: '90%',
              width: '95%',
              backgroundImage: 'linear-gradient(0deg, #c2b6df 10%, #cdb2bd 90%)',
              boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
          >
            {/* DEBT DATA */}
            <DebtTable mergedData={mergedData}/>
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
          {/* CALENDAR BOX */}
          <Box
              sx={{
                height: '40%',
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
            {/* CALENDAR */}
            <Calendar onChange={setDate} value={date} locale="kk"/>

          </Box>
          <Box
              sx={{
                height: '55%',
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
                {/* TODO Finish this part */}
               <Typography variant="h5"> 
               {/* {date.toDateString()} */}
               Қарыздар
               </Typography>
               <TextField 
                    id="filled-basic" 
                    label="Аңықтама"
                    inputProps={{ maxLength: 20 }}
                    variant="filled"
                    onChange={(e)=> setDebtDescription(e.target.value)}
                    sx={{
                        width: '80%'
                    }}
                />
                {/* <TextField 
                    id="filled-basic" 
                    label="Amount" 
                    variant="filled"
                    onChange={(e)=> setAmount(e.target.value)}
                    sx={{
                        width: '80%'
                    }}
                /> */}

                <FormControl sx={{ width: '80%' }} variant="filled">
                    <InputLabel  required={true} htmlFor="filled-adornment-amount">Сумма</InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        inputProps={{ maxLength: 15 }}

                        onChange={(e)=>setAmount(e.target.value)}
                        startAdornment={<InputAdornment position="start">₸</InputAdornment>}
                    />
                </FormControl>


                <TextField
                  id="outlined-select-spending"
                  variant="filled"
                  select
                  required={true}
                  inputProps={{ maxLength: 15 }}
                  onChange={(e) => setDebtLoan(e.target.value)}
                  label="Таңдау"
                  value={debtLoan}
                  sx={{ width: '80%' }}
                >
                  <MenuItem value="Debt">Қарыз</MenuItem>
                  <MenuItem value="Loan">Несие</MenuItem>
                </TextField>

                <TextField
                    id="outlined-select-spending"
                    variant="filled"
                    select
                    onChange={(e)=>setDebtType(e.target.value)}
                    value={debtType}
                    label="Таңдау"
                    required={true}
                    sx={{width: '80%'}}
                >
                    {debtTypesData && (debtTypesData.map((option) => (
                        // console.log(option.SpendingType)
                        <MenuItem key={option.id} value={option.id}>
                            {option.type}
                        </MenuItem>
                        ))
                    )}
                </TextField>

                <AddCircleOutlineIcon 
                    onClick={() => {
                      // Check if the amount variable contains only numbers without spaces
                      if (/^\d+$/.test(amount) && debtLoan && debtType) {
                        sendDebt(date, debtLoan, debtType, amount, debtDescription, navigate);
                      } else {
                        handleClickOpen();
                      }
                    }}
                    sx={{
                        fontSize:'50px',
                        '&:hover':{
                            cursor: 'pointer',
                            color: 'white'
                        },
                    }}
                />

          </Box>
        </Grid>
      </Grid>    )
}
export default DebtPage;