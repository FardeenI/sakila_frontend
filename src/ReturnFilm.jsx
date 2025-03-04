import { useState, useEffect } from "react";
import axios from 'axios'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ReturnFilm({open, customer_id}) {
  
  const [rentalIDs, setRentalIDs] = useState([])
    
  const getRentalIDs = async() => {
  const rentalIDsResponse = await axios.get('http://127.0.0.1:8080/rentalIDs');
    setRentalIDs(rentalIDsResponse.data)
  };

  useEffect(() => {
      getRentalIDs()
  }, [])

  const [returnedIDs, setReturnedIDs] = useState([])
    
  const getReturnedIDs = async() => {
  const returnedIDsResponse = await axios.get('http://127.0.0.1:8080/returned');
    setReturnedIDs(returnedIDsResponse.data)
  };

  useEffect(() => {
      getReturnedIDs()
  }, [])

  const [number, setNumber] = useState("");
  const [buttonColor, setButtonColor] = useState('#1976d2');

  useEffect(() => {
    if (!open) {
      setNumber("");
      setErrorDNE(false);
      setErrorReturned(false);
      setErrorOtherCustomer(false)
      setButtonColor('#1976d2');
      setHelperText("");
    }
  }, [open]);


  const handleChange = (e) => {
    setNumber(e.target.value);
    setErrorDNE(false);
    setErrorReturned(false);
    setErrorOtherCustomer(false)
    setButtonColor('#1976d2');
    setHelperText("");
  };

  const [errorDNE, setErrorDNE] = useState(false);
  const [errorReturned, setErrorReturned] = useState(false);
  const [errorOtherCustomer, setErrorOtherCustomer] = useState(false)
  const [helperText, setHelperText] = useState("");

  const handleSubmit = async () => { {/* We make the handle submit function async to create a async post request on the button click */}

  // Reset all error states before validation
  setErrorDNE(false);
  setErrorReturned(false);
  setButtonColor('#1976d2');
  setHelperText("");

  // Handle rental ID does not exist edge case
    const rentalExists = rentalIDs.some(obj => obj.rental_id === parseInt(number));
    if (!rentalExists) {
      setErrorDNE(true);
      setButtonColor('#d32f2f');
      setHelperText("Rental ID does not exist");
      setNumber("");
      return;
    }

    // Handle rental has already been returned edge case
    const alreadyReturned = returnedIDs.some(obj => obj.rental_id === parseInt(number));
    if (alreadyReturned) {
      setErrorReturned(true);
      setButtonColor('#d32f2f');
      setHelperText("Rental has already been returned");
      setNumber("");
      return;
    }
    
    if (number.trim() !== "") {
      try {
        const body = {"rental_id": parseInt(number)};
        const response = await axios.put(`http://127.0.0.1:8080/returnMovie/${customer_id}`, body);
        setButtonColor('#2e7d32');
        setHelperText("Successfully returned DVD")
        if (response.data.affectedRows === 0) {
          setErrorOtherCustomer(true)
          setHelperText("Cannot return another customer's film copy")
          setButtonColor('#d32f2f');
        }

        // Reset input field
        setNumber("");
      } catch (error) {
        console.error("Error returning movie:", error);
      }
    }

  };

  return (
    <>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '20ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="returnMovie" label="Enter Rental ID" variant="outlined" value={number} onChange={handleChange} error={errorDNE || errorReturned || errorOtherCustomer} helperText={helperText}/>
      <Button variant="contained" sx={{backgroundColor: buttonColor, height:'7ch' }} onClick={handleSubmit}>
        Return Movie
      </Button>
    </Box>
    </>
  );
}
