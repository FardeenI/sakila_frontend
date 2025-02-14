import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar';

export default function CustomersPage() {

const [customersArray, setCustomersArray] = useState([])

const getCustomersApi = async() => {
    const customersResponse = await axios.get('http://127.0.0.1:8080/customers');
    setCustomersArray(customersResponse.data)
};

useEffect(() => {
    getCustomersApi()
}, [])
    
    return (
        <>
            <Navbar/>
            <h1>This is the Customers page</h1>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </thead>
                <tbody>
                    {
                        customersArray.map((customer, index) => (
                            <tr key={index}>
                            <td> {customer.customer_id}</td> 
                            <td>{customer.first_name} {customer.last_name}</td>
                            <td>{customer.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}