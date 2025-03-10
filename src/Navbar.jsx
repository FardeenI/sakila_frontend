{/*
import { Link } from 'react-router-dom'
export default function Navabar() {
    return (
        <>
        <header style={{display:"flex", float:"right"}}> 
        <Link to='/' style={{padding:"10px"}} >Home Page </Link>
        <Link to='/films'style={{padding:"10px"}}>Films Page </Link>
        <Link to='/customers'style={{padding:"10px"}}>Customers Page</Link>
        </header>
        <br></br>
        </>
    )
}
 */}
 import { Link } from "react-router-dom";

 export default function Navbar() {
   return (
     <header
       style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         backgroundColor: "#1976d2",
         padding: "10px", // Reduced padding
         position: "fixed",
         top: "0",
         left: "0",
         width: "100%",
         boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
         zIndex: "1000",
       }}
     >
       <nav style={{ display: "flex", gap: "15px" }}>
         <Link
           to="/"
           style={{
             color: "white",
             textDecoration: "none",
             fontSize: "16px", // Slightly smaller font
             fontWeight: "bold",
             padding: "6px 10px", // Reduced padding
             borderRadius: "4px",
             transition: "background 0.3s",
           }}
           onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.2)")}
           onMouseLeave={(e) => (e.target.style.background = "transparent")}
         >
           Home
         </Link>
         <Link
           to="/films"
           style={{
             color: "white",
             textDecoration: "none",
             fontSize: "16px",
             fontWeight: "bold",
             padding: "6px 10px",
             borderRadius: "4px",
             transition: "background 0.3s",
           }}
           onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.2)")}
           onMouseLeave={(e) => (e.target.style.background = "transparent")}
         >
           Films
         </Link>
         <Link
           to="/customers"
           style={{
             color: "white",
             textDecoration: "none",
             fontSize: "16px",
             fontWeight: "bold",
             padding: "6px 10px",
             borderRadius: "4px",
             transition: "background 0.3s",
           }}
           onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.2)")}
           onMouseLeave={(e) => (e.target.style.background = "transparent")}
         >
           Customers
         </Link>
       </nav>
     </header>
   );
 }
 