import { useState, useEffect } from 'react'
import axios from 'axios'
import FilmDetailsPopup from './FIlmDetailsPopup';
import ActorDetailsPopup from './ActorDetailsPopup';
import Box from '@mui/material/Box';
import Navbar from './Navbar';

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
            <h1>This is the landing page!</h1>
            <h2>Here are the Top 5 Films:</h2>
            <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    p: 0, 
                    m: 10, 
                    bgcolor: 'background.paper', 
                    borderRadius: 1, 
                }}
            >
            {
                top5FilmsArray.map((film, index) => (
                    <div key={index} style={{padding:"10px", backgroundColor:"#D5FFFF", margin:"10px", borderStyle:"solid", borderWidth:"4px", borderColor:"black"}}>
                    <span style={{ fontWeight: 'bold', color:'black'}}>{film.title}</span>
                    <br></br>
                    <span style={{ fontWeight: 'bold', color:'black'}}> Rented: {film.rented} </span>
                    <br></br>
                    <span><FilmDetailsPopup filmDescription={film.description} filmRelease={film.release_year} filmRating={film.rating} filmTitle={film.title} rentedCount={film.rented} filmGenre={film.genre}/></span>
                    <br></br>
                    <br></br>
                    </div>
                ))
            }
            </Box>
            <h2>Here are the Top 5 Actors:</h2>
            <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    p: 0, 
                    m: 10, 
                    bgcolor: 'background.paper', 
                    borderRadius: 1, 
                }}
            >
                {
                    top5ActorsArray.map((actor, index) => (
                        <div key={index} style={{padding:"10px", backgroundColor:"#ffe4ed", margin:"10px", borderStyle:"solid", borderWidth:"4px", borderColor:"black"}}>
                        <span style={{ fontWeight: 'bold', color:'black'}}>{actor.first_name} {actor.last_name}</span>
                        <br></br>
                        <span style={{ fontWeight: 'bold', color:'black'}}> Rented: {actor.rented} </span>
                        <br></br>
                        <span><ActorDetailsPopup actorName={`${actor.first_name} ${actor.last_name}`} actorID={actor.actor_id}/></span>
                        <br></br>
                        <br></br>
                        </div>
                    ))
                }
            </Box>
            
        </>
    )
}