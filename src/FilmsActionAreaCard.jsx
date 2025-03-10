import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import FilmDetailsPopup from './FIlmDetailsPopup';

export default function FilmsActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 220, minWidth: 180, margin: 1}}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="/blueFilmLogo.jpg"
          alt="Films Logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.filmTitle}
          </Typography>
          <div style={{fontWeight:'bold'}}>Rented: {props.rentedCount}</div>
          <FilmDetailsPopup filmDescription={props.filmDescription} filmRelease={props.filmRelease} filmRating={props.filmRating} filmTitle={props.filmTitle} rentedCount={props.rentedCount} filmGenre={props.filmGenre}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
