import { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import FilmsActionAreaCard from './FilmsActionAreaCard';
import ActorsActionAreaCard from './ActorsActionAreaCard';

export default function LandingPage() {
    
    const [top5FilmsArray, setTop5FilmsArray] = useState([])
    
    const getTop5FilmsApi = async() => {
        const top5FilmsResponse = await axios.get('http://127.0.0.1:8080/films/top5films');
        setTop5FilmsArray(top5FilmsResponse.data)
    };

    useEffect(() => {
        getTop5FilmsApi()
    }, [])


    const [top5ActorsArray, setTop5ActorsArray] = useState([])
    
    const getTop5ActorsApi = async() => {
        const top5ActorsResponse = await axios.get('http://127.0.0.1:8080/actors/top5actors');
        setTop5ActorsArray(top5ActorsResponse.data)
    };

    useEffect(() => {
        getTop5ActorsApi()
    }, [])

    return (
        <>
            <Navbar/>
            <h1 style={{color:"#1976d2"}}>Sakila Website</h1>
            <h2 style={{color:"black"}}>Here are the Top 5 Films:</h2>
            
            {
                top5FilmsArray.map((film, index) => (
                  <span style={{display:"inline-block"}}>
                  <FilmsActionAreaCard filmDescription={film.description} filmRelease={film.release_year} filmRating={film.rating} filmTitle={film.title} rentedCount={film.rented} filmGenre={film.genre} />
                  </span>
                ))
            }
            

            <h2 style={{color:"black"}}>Here are the Top 5 Actors:</h2>
            <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    m: 5, 
                    bgcolor: 'background.paper', 
                    borderRadius: 1, 
                    justifyContent: 'center'
                }}
            >
                {
                    top5ActorsArray.map((actor, index) => (
                      <span style={{display:"inline-block"}}>
                      <ActorsActionAreaCard actorName={`${actor.first_name} ${actor.last_name}`} actorID={actor.actor_id} rented={actor.rented}/>
                      </span>
                    ))
                }
            </Box>
            
        </>
    )
}