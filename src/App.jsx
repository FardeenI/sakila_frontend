import './App.css'
import HelloWorld from './HelloWorld'
import axios from 'axios'
import { useState } from 'react'

function App() {

  const [quote, setQuote] = useState('')

  return (
    <>
      <HelloWorld/>
      <button onClick={() => axios.get('https://api.kanye.rest').then(result => setQuote(result.data.quote))}>Get a Quote</button>
      <h1>{quote}</h1>
    </>
  )
}

export default App