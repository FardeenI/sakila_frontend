import { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilmsPage() {

const [filmsArray, setFilmsArray] = useState([])

const getFilmsApi = async() => {
    const filmsResponse = await axios.get('http://127.0.0.1:8080/films');
    setFilmsArray(filmsResponse.data)
};

useEffect(() => {
    getFilmsApi()
}, [])
    
    return (
        <>
            <h1>This is the films page</h1>
            <div>
            {
                filmsArray.map((film, index) => (
                    <div key={index}>
                    <span key={index}>{film.title}</span>
                    <br></br>
                    </div>
                ))
            }
            </div>
        </>
    )
}