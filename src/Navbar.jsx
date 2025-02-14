import { Link } from 'react-router-dom'
export default function Navabar() {
    return (
        <div> 
        <Link to='/' style={{padding:"10px"}}>Home Page </Link>
        <Link to='/films'style={{padding:"10px"}}>Films Page </Link>
        <Link to='/customers'style={{padding:"10px"}}>Customers Page</Link>
        </div>
    )
}