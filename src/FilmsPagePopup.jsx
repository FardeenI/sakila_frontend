import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilmDetailsPopup(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [rentableFilms, setRentableFilmsArray] = useState([])

  const getRentableFilmsApi = async() => {
      const rentableFilmsResponse = await axios.get(`http://127.0.0.1:8080/films/${props.filmID}/rentable`);
      setRentableFilmsArray(rentableFilmsResponse.data)
  };

  useEffect(() => {
      getRentableFilmsApi()
  }, [])

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', color:'black'}}>
          {props.filmTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontWeight: 'bold', color:'black'}}>Description: {props.filmDescription}</span>
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Release Year: {props.filmRelease}</span>
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Rental Rate: {props.filmRental}</span>
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Length: {props.filmLength} minutes</span>
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Replacement Cost: {props.filmReplacement}</span>
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Special Features: {props.filmFeatures}</span>
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Available Inventory IDs: </span>
            {
                rentableFilms.map((rentableFilmID, index) => (
                  <span key={index} style={{ fontWeight: 'bold' , color:'black'}}>{rentableFilmID.rentableID}  |  </span>
                ))
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
