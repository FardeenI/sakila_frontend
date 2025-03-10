import * as React from 'react';
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'


export default function ActorDetailsPopup(props) {

  const actorName = props.actorName
  const actor_id = props.actorID

  const [actorsTop5, setActorsTop5Array] = useState([])
    
  const getActorsTop5Api = async() => {
  const actorsTop5Response = await axios.get(`http://127.0.0.1:8080/actors/${actor_id}/top5films`);
    setActorsTop5Array(actorsTop5Response.data)
  };

  useEffect(() => {
    getActorsTop5Api()
  }, [])

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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <h2 style={{ fontWeight: 'bold' , color:'black'}}>Top 5 {actorName} Films:</h2>
            <div>
            {
                actorsTop5.map((film, index) => (
                    <div key={index}>
                    <span key={index} style={{ fontWeight: 'bold' , color:'black'}}>{film.title}</span>
                    <br></br>
                    <span key={index} style={{ color:'black'}}> Rented: {film.rental_count} </span>
                    <br></br>
                    <br></br>
                    </div>
                ))
            }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
