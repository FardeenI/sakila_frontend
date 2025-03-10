import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ActorDetailsPopup from './ActorDetailsPopup';

export default function ActorsActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 220, minWidth: 180, margin: 1, height: '100%' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="/actorIcon.jpg"
          alt="Films Logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.actorName}
          </Typography>
          <div style={{fontWeight:'bold'}}>Movies: {props.rented}</div>
          <ActorDetailsPopup actorName={props.actorName} actorID={props.actorID}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
