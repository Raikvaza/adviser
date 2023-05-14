import { Grid, Box, FormControl, InputLabel, Stack, FilledInput, InputAdornment, TextField, MenuItem, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useLoaderData } from "react-router";
import { sendIncome } from "../../api/Budget/SendIncome";
import { useState } from "react";
import { useNavigate } from "react-router";
import { sendSpending } from "../../api/Budget/SendSpending";
import BudgetTable from "../../components/Budget-Table/BudgetTable";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Sorting data from the server and returning a single array
const mergeAndSortByDate = (incomeArray, spendingArray) => {
  const incomeData = incomeArray.length > 0 ? incomeArray.map((item) => ({
    ID: 'income_'+item.ID,
    date: item.date,
    description: item.description,
    amount: item.amount,
    type_id: item.income_type_id,
    type: "Income",
  })) : [];

  const spendingData = spendingArray.length > 0 ? spendingArray.map((item) => ({
    ID: 'spending_' + item.ID,
    date: item.date,
    description: item.description,
    amount: item.amount,
    type_id: item.spending_type_id,
    type: "Spending",
  })) : [];

  const mergedArray = [...incomeData, ...spendingData];

  return mergedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const BudgetPage = () => {
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const { Types, Stats } = useLoaderData(); //Spending and Income Types from the Server
    // console.log(Types.Type_spending); //Array with spending types
    // console.log(Types.Type_income); // Array with income types
    // console.log(Stats.Spending); // Spending data
    // console.log(Stats.Income);  // Income data 
    
    const mergedData = mergeAndSortByDate(Stats.Income, Stats.Spending);
    // console.log(mergedData);
    const [income, setIncome] = useState();
    const [spending, setSpending] = useState();
    const [incomeType, setIncomeType] = useState(Types && Types.Type_income && Types.Type_income[0].ID ? Types.Type_income[0].ID: 1);
    const [spendingType, setSpendingType] = useState(Types && Types.Type_spending && Types.Type_spending[0].ID ? Types.Type_spending[0].ID: 1);
    const [incomeDescription, setIncomeDescription] = useState();
    const [spendingDescription, setSpendingDescription] = useState();

  //FILTERS
  const periods = [
    { kazakh: 'Жыл', english: 'year' },
    { kazakh: 'Ай', english: 'month' },
    { kazakh: 'Апта', english: 'week' },
    { kazakh: 'Күн', english: 'day' },
  ];
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
      {/* BUDGET MAIN CONTAINER */}
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
          {/* BUDGET DATA BOX */}
          
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
          
          <Box
            sx={{
              height: '90%',
              width: '95%',
              // boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.25)",
              // borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // border: '1px solid rgba(0, 0, 0, 0.25)',
              position: 'relative'
            }}
          >
              {/* TABLE */}
            <BudgetTable mergedData={mergedData}/>


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
                {/* TOP HEADER */}
                <Typography variant="h4" >
                    Кірісті қосу
                </Typography>
                {/* TOP AMOUNT */}
                <FormControl sx={{ width: '80%' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Сумма</InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        onChange={(e)=>setIncome(e.target.value)}
                        inputProps={{ maxLength: 15 }}
                        startAdornment={<InputAdornment position="start">₸</InputAdornment>}
                    />
                </FormControl>
              {/* TOP TYPE */}
                <TextField
                    id="outlined-select-currency"
                    variant="filled"
                    select
                    label="Таңдау"
                    onChange={(e)=>setIncomeType(e.target.value)}
                    value={incomeType}
                    
                    sx={{width: '80%'}}
                    >
                    {Types.Type_income && Types.Type_income.map((option) => (
                        <MenuItem key={option.ID} value={option.ID}>
                            {option.IncomeType}
                        </MenuItem>
                    ))}
                </TextField>
                {/* Description */}
                <TextField 
                    id="filled-basic" 
                    label="Анықтама"
                    variant="filled"
                    inputProps={{ maxLength: 15 }}
                    onChange={(e)=> setIncomeDescription(e.target.value)}
                    sx={{
                        width: '80%'
                    }}
                />
            {/* TOP BUTTON */}
                <AddCircleOutlineIcon 
                    onClick={(e) =>{
                        if (/^\d+$/.test(income)) {
                          sendIncome(e, incomeType, income, incomeDescription, navigate)
                        } else{
                          handleClickOpen();
                        }  
                      }} 
                    sx={{
                        fontSize:'50px',
                        '&:hover':{
                            cursor: 'pointer',
                            color: 'white'
                        }
                    }}
                />

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
                    Шығысты қосу
                </Typography>
                {/* BOTTOM AMOUNT */}
                <FormControl sx={{ width: '80%' }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Сумма</InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        inputProps={{ maxLength: 15 }}
                        onChange={(e)=>setSpending(e.target.value)}
                        startAdornment={<InputAdornment position="start">₸</InputAdornment>}
                    />
                </FormControl>
              {/* BOTTOM TYPE */}
                <TextField
                    id="outlined-select-spending"
                    variant="filled"
                    select
                    onChange={(e)=>setSpendingType(e.target.value)}
                    value={spendingType}
                    // defaultValue={Types && Types.Type_spending && Types.Type_spending[0].ID ? Types.Type_spending[0].ID: 1}
                    label="Таңдау"
                    sx={{width: '80%'}}
                >
                    {Types.Type_spending && (Types.Type_spending.map((option) => (
                        // console.log(option.SpendingType)
                        <MenuItem key={option.ID} value={option.ID}>
                            {option.SpendingType}
                        </MenuItem>
                        ))
                    )}
                </TextField>
                {/* Description */}
                <TextField 
                    id="filled-basic" 
                    label="Анықтама" 
                    variant="filled"
                    inputProps={{ maxLength: 15 }} 
                    onChange={(e)=> setSpendingDescription(e.target.value)}
                    sx={{
                        width: '80%'
                    }}
                />
            {/* BOTTOM BUTTON */}
                <AddCircleOutlineIcon 
                    
                    onClick={(e) =>{
                      if (/^\d+$/.test(spending)) {
                        sendSpending(e, spendingType, spending, spendingDescription, navigate)
                        
                      } else{
                        handleClickOpen();
                      }  
                    }}
                    sx={{
                        fontSize:'50px',
                        '&:hover':{
                            cursor: 'pointer',
                            color: 'white'
                        }
                    }}
                />
          </Box>
        </Grid>
      </Grid>
      
    )
}
export default BudgetPage;