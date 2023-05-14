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

const BudgetTable = ({mergedData}) => {

    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
/*
sports OK       ID: 1, 6
transport OK    ID: 3
games OK        ID: 2
presents OK     ID: 4
food OK         ID: 5
shopping OK     ID: 7
telephone OK    ID: 9
house OK        ID: 10
other OK        ID: 8, 11
*/ 
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
<Paper elevation={12} sx={{ borderRadius: "20px", height: '100%', width: '100%', display: "flex", flexDirection: "column", justifyContent: "space-between"  }}>
<TableContainer sx={{ borderRadius: "20px" }}>
  <Table sx={{ minWidth: 800, outline: '2px solid #06c'}} aria-label="simple table">
    <TableHead>
      <TableRow sx={{ height: theme => `${theme.spacing(8)}px`, backgroundImage: 'linear-gradient(0deg, #c2b6df 10%, #cdb2bd 90%)' }}>
        <TableCell sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Түрі</TableCell>
        <TableCell align="right" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Күн</TableCell>
        <TableCell align="right" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Анықтама</TableCell>
        <TableCell align="right" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Сумма</TableCell>
        {/* <TableCell align="right" sx={{ color: 'primary.contrastText',  fontSize: '1rem' }}>Type ID</TableCell> */}
      </TableRow>
    </TableHead>
    <TableBody sx={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}>
      {mergedData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
          <TableRow key={row.ID} sx={{
              '&:nth-of-type(odd)': { backgroundColor: 'grey.200' },
              '&:hover': { backgroundColor: 'grey.400' },
            }}>
            <TableCell component="th" scope="row">
            {row.type === "Income" ? <MonetizationOnIcon /> : handleSpendingType(row.type_id)}
            </TableCell>
            <TableCell align="right">{row.date}</TableCell>
            <TableCell align="right">{row.description}</TableCell>
            <TableCell align="right">{row.amount} ₸</TableCell>
            {/* <TableCell align="right">{row.type_id}</TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
<TablePagination
        component="div"
        count={mergedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
      />
</Paper>

)
}
export default BudgetTable;