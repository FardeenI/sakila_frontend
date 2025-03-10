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
import DeleteCustomer from './DeleteCustomer';

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
                        <span style={{ fontWeight: 'bold', color:'black'}}>Customer First Name: </span>{props.customerFirst}
                        <br></br>
                        <br></br>
                        <span style={{ fontWeight: 'bold' , color:'black'}}>Customer Last Name: </span>{props.customerLast}
                        <br></br>
                        <br></br>
                        <span style={{ fontWeight: 'bold' , color:'black'}}>Customer Email: </span>{props.customerEmail}
                        <br></br>
                        <br></br>
                        <span style={{ fontWeight: 'bold' , color:'black'}}>Member Since: </span>{props.joinDate} GMT
                        <br></br>
                        <br></br>

                        <RentalsPaginationTable customer_id={props.customer_id}/>

                        <div style={{display:'flex'}}>
                        <ReturnFilm open={open} customer_id={props.customer_id}/>
                        
                        <EditCustomerDetails customer_id={props.customer_id} customerFirst={props.customerFirst} customerLast={props.customerLast} customerEmail={props.customerEmail}/>
                        
                        <DeleteCustomer customer_id={props.customer_id} customerFirst={props.customerFirst} customerLast={props.customerLast} onDeleteCustomer={props.onDeleteCustomer}/>
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