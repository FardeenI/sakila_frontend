import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FilmDetailsPopup(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ fontWeight: 'bold', fontSize: '1rem', borderWidth: 2, borderColor: 'black', padding: '6px 16px', margin: '10px'}}>
        View Details
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
            <span style={{ fontWeight: 'bold', color:'black'}}>Genre: </span>{props.filmGenre}
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold', color:'black'}}>Release Year: </span>{props.filmRelease}
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold', color:'black'}}>Rating: </span>{props.filmRating}
            <br></br>
            <br></br>
            <span style={{ fontWeight: 'bold', color:'black'}}>Rented: </span>{props.rentedCount}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
