import CustomersPaginationTable from './CustomersPaginationTable';
import Navbar from './Navbar';

export default function CustomersPage() {
    return (
        <>
            <Navbar/>
            <h1>This is the Customers page!</h1>
            <CustomersPaginationTable />
        </>
    )
}