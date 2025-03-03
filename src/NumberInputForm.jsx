import { useState, useEffect } from "react";
import axios from 'axios'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NumberInputForm(props) {
  
  const [customerIDs, setCustomerIDs] = useState([])
    
  const getCustomerIDs = async() => {
  const customerIDsResponse = await axios.get('http://127.0.0.1:8080/customerIDs');
    setCustomerIDs(customerIDsResponse.data)
  };

  useEffect(() => {
      getCustomerIDs()
  }, [])

  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    setNumber(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(false);
      setHelperText("");
    }
  };

  const body = {"rentableID":props.rentableFilms[0]?.rentableID, "customer_id":number} // This '?' says basically that the statement will only execute if the preceding clause is NOT NULL

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSubmit = async () => { {/* We make the handle submit function async to create a async post request on the button click */}
    // Handle cases where there are no rentable movies
    if (props.rentableFilms.length === 0) {
        setError(true)
        setHelperText("No rentable films")
        return
    }
    
    let validID = false

    customerIDs.forEach(obj => {
        if (parseInt(number) == obj.customer_id) {
            validID = true
        }
    });

    if (number.trim() !== "") 
    {
      if (validID) {
        // POST HERE
        const response =  await axios.post('http://127.0.0.1:8080/rentAmovie', body) // This is the post request
        props.setPostFlag(true) // This is an invocation of the function that we passed to the number input form as a prop, to change the flag for checking if any film has been rented to be true
        console.log(response)
      }
      else {
        // Handle invalid Customer IDs
        setError(true)
        setHelperText("Invalid Customer ID")
        return
      }
      setNumber(""); // Clear input after submission
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
      <TextField id="enterCustomerID" label="Enter Customer ID" variant="outlined" value={number} onChange={handleChange} error={error} helperText={helperText}/>
      <Button variant="contained" sx={{height:'7ch'}} onClick={handleSubmit}>
        Rent Movie
      </Button>
    </Box>
    </>
  );
}
