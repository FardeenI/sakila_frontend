import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import axios from 'axios';


export default function DeleteCustomer(props) {
  const [open, setOpen] = React.useState(false);
  
  const [buttonColor, setButtonColor] = useState('#d32f2f');

  // const body = {"first_name":firstName, "last_name":lastName, "email":email} 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // POST HERE
    const response =  await axios.delete(`http://127.0.0.1:8080/deleteCustomer/${props.customer_id}`) // This is the post request
    window.alert("You have successfully deleted " + props.customerFirst + " " + props.customerLast + " and all associated data.");
    props.onDeletCustomer(response.data)
    };

  
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{height:'7ch', margin:'8px'}}>
        Delete Customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', color:'black'}}>
          DELETE {props.customerFirst} {props.customerLast} AND ALL ASSOCIATED DATA?
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
            WARNING: Are you sure you want to delete this customer? This action cannot be undone.
            <br></br>
            <br></br>
            <Button variant="contained" sx={{backgroundColor: buttonColor, height:'7ch'}} onClick={handleSubmit} > 
                DELETE CUSTOMER
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
