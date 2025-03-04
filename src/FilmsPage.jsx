import Navbar from './Navbar';
import FilmsPaginationSearchTable from './FilmsPaginationSearchTable';

export default function FilmsPage() {
    
    return (
        <>
            <Navbar/>
            <h1>Films</h1>
            <FilmsPaginationSearchTable />
        </>
    )
}