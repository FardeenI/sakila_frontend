import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';


export default function AddNewCustomer({onNewCustomer}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    // Reset all fields and errors when closing the form
    setFirstName("");
    setLastName("");
    setEmail("");
    setErrorFirst(false);
    setErrorLast(false);
    setErrorEmail(false);
    setHelperTextFirst("");
    setHelperTextLast("");
    setHelperTextEmail("");
    setButtonColor('#1976d2');
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [buttonColor, setButtonColor] = useState('#1976d2');
  const body = {"first_name":firstName, "last_name":lastName, "email":email} 

  const [errorFirst, setErrorFirst] = useState(false);
  const [errorLast, setErrorLast] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const [helperTextFirst, setHelperTextFirst] = useState("");
  const [helperTextLast, setHelperTextLast] = useState("");
  const [helperTextEmail, setHelperTextEmail] = useState("");

  const isAlpha = (str) => {
    return /^[a-zA-Z]+$/.test(str);
  };

  const isEmail = (str) => {
    return /^\S+@\S+\.\S+$/.test(str);
  };

  const handleChangeFirst = (e) => {
    const value = e.target.value;
    setFirstName(value);
    
    if (value.trim() !== "") {
        setErrorFirst(false);
        setHelperTextFirst("");
    }
  };

  const handleChangeLast = (e) => {
      const value = e.target.value;
      setLastName(value);

      if (value.trim() !== "") {
          setErrorLast(false);
          setHelperTextLast("");
      }
  };

  const handleChangeEmail = (e) => {
      const value = e.target.value;
      setEmail(value);

      if (value.trim() !== "") {
          setErrorEmail(false);
          setHelperTextEmail("");
      }
  };  

  const handleSubmit = async () => {

    let validFirst = true
    let validLast = true
    let validEmail = true

    // Handle edge cases
    if (firstName === "") { // Fill in with edge case condition
        setErrorFirst(true)
        setHelperTextFirst("Must enter First Name")
        validFirst = false
    }
    else if (!isAlpha(firstName)) {
      setErrorFirst(true)
      validFirst = false
      setHelperTextFirst("First names must be alphabetic")
    }

    if (lastName === "") { // Fill in with edge case condition
        setErrorLast(true)
        setHelperTextLast("Must enter Last Name")
        validLast = false
    }
    else if (!isAlpha(lastName)) {
      setErrorLast(true)
      validLast = false
      setHelperTextLast("Last names must be alphabetic")
    }

    if (email === "") { // Fill in with edge case condition
        setErrorEmail(true)
        setHelperTextEmail("Must enter Email")
        validEmail = false
    }
    else if (!isEmail(email)) {
      setErrorEmail(true)
      validEmail = false
      setHelperTextEmail("Email must be in the form of an email")
    }
    

    if (!validFirst || !validLast || !validEmail) {
      setButtonColor('#d32f2f');
      return
  }

    // POST HERE
    const response =  await axios.post('http://127.0.0.1:8080/customers', body) // This is the post request
    onNewCustomer(response.data)
    setButtonColor('#2e7d32');
    setFirstName(""); // Clear input after submission
    setLastName("");
    setEmail("");
  };

  {/* ADD CHECKING FOR THE INPUT FIELDS TO MAKE SURE FIRST NAME AND LAST NAME ARE ALPHA AND EMAIL HOLDS FORM OF EMAIL */}

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{height:'7ch', margin:'8px'}}>
        Add Customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', color:'black'}}>
          Customer Sign Up
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <>
            <Box
            component="form"
            sx={{ width: 500, maxWidth: '100%' }}
            noValidate
            autoComplete="off"
            >
            <br></br>
            <TextField id="customerFirstName" label="Enter First Name" fullWidth onChange={handleChangeFirst} value={firstName} error={errorFirst} helperText={helperTextFirst}/>
            <br></br>
            <br></br>
            <TextField id="customerLastName" label="Enter Last Name" fullWidth onChange={handleChangeLast} value={lastName} error={errorLast} helperText={helperTextLast}/>
            <br></br>
            <br></br>
            <TextField id="customerEmail" label="Enter Email Address" fullWidth onChange={handleChangeEmail} value={email} error={errorEmail} helperText={helperTextEmail}/>
            <br></br>
            <br></br>
            <Button variant="contained" sx={{backgroundColor: buttonColor, height:'7ch' }} onClick={handleSubmit} > 
                Create Customer
            </Button>
            {/* Add a popup success message here on valid customer create? */}
            </Box>
        </>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
