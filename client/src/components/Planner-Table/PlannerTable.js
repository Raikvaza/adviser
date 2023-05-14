import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination
  } from "@mui/material";
import { useState } from "react";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HouseIcon from '@mui/icons-material/House';
import HubIcon from '@mui/icons-material/Hub';


const PlannerTable = ({typesData, data}) => {

  // const data = [
  //   {
  //     amount: 56789,
  //     spending: 32123,
  //     difference: 24666
  //   },
  //   {
  //     amount: 98765,
  //     spending: 67890,
  //     difference: 30875
  //   },
  //   {
  //     amount: 0,
  //     spending: 23123,
  //     difference: -23123
  //   },
  //   {
  //     amount: 123123,
  //     spending: 0,
  //     difference: 123123
  //   },
  //   {
  //     amount: 0,
  //     spending: 0,
  //     difference: 0
  //   },
  //   {
  //     amount: 11111,
  //     spending: 99999,
  //     difference: -88888
  //   },
  //   {
  //     amount: 55555,
  //     spending: 44444,
  //     difference: 11111
  //   },
  //   {
  //     amount: 77777,
  //     spending: 66666,
  //     difference: 11111
  //   },
  //   {
  //     amount: 88888,
  //     spending: 55555,
  //     difference: 33333
  //   },
  //   {
  //     amount: 33333,
  //     spending: 22222,
  //     difference: 11111
  //   },
  //   {
  //     amount: 44444,
  //     spending: 55555,
  //     difference: -11111
  //   }
  // ];
  
const handleSpendingType = (ID) => {
    switch (ID) {
      case 1:
      case 6:
        return <SportsBasketballIcon/>;
      case 3:
        return < LocalTaxiIcon/>;
      case 2:
        return < SportsEsportsIcon/>;
      case 4:
        return < CardGiftcardIcon/>;
      case 5:
        return < FastfoodIcon/>;
      case 7:
        return < ShoppingCartIcon/>;
      case 9:
        return < PhoneAndroidIcon/>;
      case 10:
        return < HouseIcon/>;
      case 8:
      case 11:
        return < HubIcon/>;
      default:
        return "unknown";
    }
  };

return (
<TableContainer component={Paper} elevation={12} sx={{ borderRadius: "20px", height: '100%', width: '100%' }}>
  <Table stickyHeader sx={{ minWidth: 800, height:"100%", outline: '2px solid #06c'}} aria-label="simple table">
    <TableHead>
      <TableRow sx={{ height: theme => `${theme.spacing(8)}px`, backgroundImage: 'linear-gradient(0deg, #c2b6df 10%, #cdb2bd 90%)' }}>
        <TableCell sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}></TableCell>
        <TableCell align="justify" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Анықтама</TableCell>
        <TableCell align="justify" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Шектеме</TableCell>
        <TableCell align="justify" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Айлық Щығындар</TableCell>
        <TableCell align="justify" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Мәртебе</TableCell>
        {/* <TableCell align="right" sx={{ color: 'primary.contrastText',  fontSize: '1rem' }}>Type ID</TableCell> */}
      </TableRow>
    </TableHead>
    
    <TableBody sx={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}>
      {typesData.map((row) => (
          <TableRow key={row.ID} sx={{
            //'&:nth-of-type(odd)': { backgroundColor: 'grey.200' },
            backgroundColor: (data[row.ID].spending === 0 && data[row.ID].amount === 0) ?  {backgroundColor:"#F5E8E8"}: (data[row.ID].difference > 0  ? "#92F685" : "#FF9292"),
            '&:hover': { backgroundColor: 'grey.400' },
            }}>
            <TableCell component="th" scope="row">
              {handleSpendingType(row.ID)}
            </TableCell>
            <TableCell align="justify">{row.SpendingType}</TableCell>
            <TableCell align="justify">{data[row.ID].amount}</TableCell>
            <TableCell align="justify">{data[row.ID].spending}</TableCell>
            <TableCell align="justify">{data[row.ID].difference}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


)
}
export default PlannerTable;