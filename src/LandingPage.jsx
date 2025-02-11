import { useState, useEffect } from 'react'
import axios from 'axios'
import FilmDetailsPopup from './FIlmDetailsPopup';
import OutlinedCard from './OutlinedCard';

export default function LandingPage() {
    
    const [top5FilmsArray, setTop5FilmsArray] = useState([])
    
    const getTop5FilmsApi = async() => {
        const top5FilmsResponse = await axios.get('http://127.0.0.1:8080/');
        setTop5FilmsArray(top5FilmsResponse.data)
    };

    useEffect(() => {
        getTop5FilmsApi()
    }, [])

    return (
        <>
            <h1>This is the landing page!</h1>
            <h2>Here are the Top 5 Films:</h2>
            <div>
            {
                top5FilmsArray.map((film, index) => (
                    <div key={index}>
                    <span key={index}>{film.title}</span>
                    <span key={index}> Rented: {film.rented} </span>
                    <span key = {index}><FilmDetailsPopup filmDescription={film.description} filmRelease={film.release_year} filmRating={film.rating} filmTitle={film.title} rentedCount={film.rented} filmGenre={film.genre}/></span>
                    <br></br>
                    </div>
                ))
            }
            </div>
            
        </>
    )
}