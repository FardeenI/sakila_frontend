import Navbar from './Navbar';
import FilmsPaginationSearchTable from './FilmsPaginationSearchTable';

export default function FilmsPage() {
    
    return (
        <>
            <Navbar/>
            <h1 style={{color:"#1976d2"}}>Films</h1>
            <FilmsPaginationSearchTable />
        </>
    )
}