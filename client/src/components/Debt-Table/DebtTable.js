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
  import HandshakeIcon from '@mui/icons-material/Handshake';
  
  
  const DebtTable = ({ mergedData }) => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    return (
      <Paper elevation={12} sx={{ borderRadius: "20px", height: '100%', width: '100%', display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <TableContainer sx={{ borderRadius: "20px" }}>
          <Table sx={{ minWidth: 800, outline: '2px solid #06c' }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ height: theme => `${theme.spacing(8)}px`, backgroundImage: 'linear-gradient(0deg, #c2b6df 10%, #cdb2bd 90%)' }}>
                <TableCell sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Түрі</TableCell>
                <TableCell align="right" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Күн</TableCell>
                <TableCell align="right" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Анықтама</TableCell>
                <TableCell align="right" sx={{ color: 'primary.contrastText', fontSize: '1.2rem', fontWeight: "800" }}>Сумма</TableCell>
                {/* <TableCell align="right" sx={{ color: 'primary.contrastText', fontSize: '1rem' }}>Type ID</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody sx={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}>
              {mergedData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
                <TableRow key={row.ID} sx={{
                  '&:nth-of-type(odd)': { backgroundColor: 'grey.200' },
                  '&:hover': { backgroundColor: 'grey.400' },
                }}>
                  <TableCell component="th" scope="row">
                    {row.type === "Loan" ? <MonetizationOnIcon /> : <HandshakeIcon/>}
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
    );
  };
  
  export default DebtTable;