import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReturnFilm from './ReturnFilm';
import RentalsPaginationTable from './RentalsPaginationTable';
import EditCustomerDetails from './EditCustomerDetails';

export default function CustomersPagePopup(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    View
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{ '& .MuiDialog-paper': { width: '1000px', maxWidth: '90vw' } }}
                >
                    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold', color:'black'}}>
                        Customer Details and History
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {/* Customer Details Text Line Item(s) */}
                        <span style={{ fontWeight: 'bold', color:'black'}}>Customer First Name: {props.customerFirst}</span>
                        <br></br>
                        <br></br>
                        <span style={{ fontWeight: 'bold' , color:'black'}}>Customer Last Name: {props.customerLast}</span>
                        <br></br>
                        <br></br>
                        <span style={{ fontWeight: 'bold' , color:'black'}}>Customer Email: {props.customerEmail}</span>
                        <br></br>
                        <br></br>
                        <span style={{ fontWeight: 'bold' , color:'black'}}>Member Since: {props.joinDate} GMT</span>
                        <br></br>
                        <br></br>

                        {/* Customer Rental History Pagination Table */}
                        <RentalsPaginationTable customer_id={props.customer_id}/>

                        <div style={{display:'flex'}}>
                        {/* Number Input form to return a film */} 
                        <ReturnFilm open={open} customer_id={props.customer_id}/>
                        
                        {/* Edit Details Popup */} {/* Delete Customer Popup */}
                        <EditCustomerDetails customer_id={props.customer_id} customerFirst={props.customerFirst} customerLast={props.customerLast} customerEmail={props.customerEmail}/>
                        </div>

                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>Close</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );
}