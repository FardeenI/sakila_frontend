import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useState, useEffect } from 'react'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomersPaginationSearchTable() {

  const [customersArray, setCustomersArray] = useState([])

  const getCustomersApi = async() => {
      const customersResponse = await axios.get('http://127.0.0.1:8080/customers');
      setCustomersArray(customersResponse.data)
  };

  useEffect(() => {
      getCustomersApi()
  }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [search, setSearch] = useState('')
  
  const [customersFilter, setFilter] = React.useState('first_name');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
    <div style={{display:"flex", float:"right"}}>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Enter Search Filter" variant="outlined" onChange={(e) => setSearch(e.target.value)}/>
    </Box>
    <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filters</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={customersFilter}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"customer_id"}>Customer ID</MenuItem>
          <MenuItem value={"first_name"}>First Name</MenuItem>
          <MenuItem value={"last_name"}>Last Name</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
        <TableBody>
            <TableRow key={"film_columns"}>
              <TableCell style={{ width: 160 }} component="th" scope="row">
                ID
              </TableCell>
              <TableCell style={{ width: 160 }}>
                Name
              </TableCell>
              <TableCell style={{ width: 160 }}>
                Email
              </TableCell>
            </TableRow>

          {
            customersArray.filter((customer) => {
            if (typeof customer[customersFilter] === 'string') {
              return customer[customersFilter].toLowerCase().includes(search.toLowerCase());
            } 
            else if (typeof customer[customersFilter] === 'number') {
              return customer[customersFilter].toString().includes(search);
            }
          }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => (
            <TableRow key={customer.customer_id}>
              <TableCell component="th" scope="row">
                {customer.customer_id}
              </TableCell>
              <TableCell component="th" scope="row">
                {customer.first_name} {customer.last_name}
              </TableCell>
              <TableCell component="td" scope="row">
                {customer.email}
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={customersArray.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>



    
  );
}
