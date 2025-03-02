import CustomersPaginationSearchTable from './CustomersPaginationSearchTable';
import Navbar from './Navbar';
import AddNewCustomer from './AddNewCustomer';

export default function CustomersPage() {
    return (
        <>
            <Navbar/>
            <h1>This is the Customers page! <AddNewCustomer/> </h1>
            <CustomersPaginationSearchTable />
        </>
    )
}