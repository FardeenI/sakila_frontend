import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react'
import axios from 'axios'
import NumberInputForm from './NumberInputForm';

export default function FilmDetailsPopup(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [rentableFilms, setRentableFilmsArray] = useState([])

  const [changedRentablesFlag, setRentablesFlag] = useState(false)
  
  const getRentableFilmsApi = async() => {
      const rentableFilmsResponse = await axios.get(`http://127.0.0.1:8080/films/${props.filmID}/rentable`);
      setRentableFilmsArray(rentableFilmsResponse.data)
  };

  // In this use effect, upon changing the rentableFilms array OR upon clicking the button to open the films page popup, the rentable films response from the endpoint is dynamically updated on the frontend
  useEffect(() => {
      getRentableFilmsApi()
      setRentablesFlag(false)
  }, [changedRentablesFlag, open])


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
            <span style={{ fontWeight: 'bold', color:'black'}}>Description: </span>{props.filmDescription}
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Release Year: </span>{props.filmRelease}
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Rental Rate: </span>{props.filmRental}
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Length: </span>{props.filmLength} minutes
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Replacement Cost: </span>{props.filmReplacement}
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Special Features: </span>{props.filmFeatures}
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold' , color:'black'}}>Available Inventory IDs: </span>
            {
                rentableFilms.map((rentableFilmID, index) => (
                  <span key={index} >{rentableFilmID.rentableID}  |  </span>
                ))
            }
            <br></br>
            <br></br>
            <NumberInputForm open={open} rentableFilms={rentableFilms} setPostFlag={setRentablesFlag}/> {/* In this component, we pass the function which changes the flag for keeping track of whether the rentable films array has been changed to the child component, the number input form*/}

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
