import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Snackbar,
    Alert,
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Select,
    IconButton,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { postFormData } from '../Helpers/apis';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';

const FormContainer = styled('div')({
    maxWidth: '90vw',
    margin: 'auto',
    padding: '2rem',
    border: 'none',
    borderRadius: '8px',
    boxShadow:"4px 4px 12px -2.5px rgba(85, 166, 246, 0.15),4px 4px 12px -2.5px rgba(85, 166, 246, 0.15),4px 4px 12px -2.5px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)"
    // backgroundColor: '#f0f2f5',
});

const FormHeading = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
});

const FormPage = ({ mode, toggleColorMode }) => {
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formData, setFormData] = useState({
        Name: '',
        Gender: '',
        Address: '',
        Amount: 0,
        Rate: 0,
        Category: '',
        Weight: '',
        Status: '',
        Date: new Date().toISOString().substr(0, 10),
        PhoneNumber: '',
        Remarks: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.loading)

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { state } = await postFormData(formData, dispatch);
        if (state === 'success') {
            setOpen(true);
            setSeverity('success');
            setMessage('Form data submitted successfully');
            navigate('/customerLists');
        } else {
            setOpen(true);
            setSeverity('error');
            setMessage('Something went wrong, please try again');
        }
    };

    return (
        <>
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />
        <FormContainer sx={{position:'relative',top:"90px"}}>
            <FormHeading variant="h6">Add Customers Data</FormHeading>
            <form component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="Name"
                            label="Name"
                            variant="outlined"
                            value={formData.Name}
                            onChange={handleChange}
                            fullWidth
                            required
                            placeholder='Your name'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                name="Gender"
                                value={formData.Gender}
                                onChange={handleChange}
                                label="Gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="others">Others</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined" size='small'>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                name="Category"
                                value={formData.Category}
                                onChange={handleChange}
                                label="Category"
                            >
                                <MenuItem value="Gold">Gold</MenuItem>
                                <MenuItem value="Silver">Silver</MenuItem>
                                <MenuItem value="Bronze">Bronze</MenuItem>
                                <MenuItem value="Bike">Bike</MenuItem>
                                <MenuItem value="Cycle">Cycle</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined" size='small'>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                name="Status"
                                value={formData.Status}
                                onChange={handleChange}
                                label="Status"
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="Address"
                            label="Address"
                            variant="outlined"
                            value={formData.Address}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            name="Amount"
                            label="Amount"
                            variant="outlined"
                            value={formData.Amount}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            name="Rate"
                            label="Rate"
                            variant="outlined"
                            value={formData.Rate}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="Weight"
                            label="Weight"
                            variant="outlined"
                            value={formData.Weight}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="date"
                            name="Date"
                            label="Date"
                            variant="outlined"
                            value={formData.Date}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="PhoneNumber"
                            label="Phone Number"
                            variant="outlined"
                            value={formData.PhoneNumber}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="Remarks"
                            label="Remarks"
                            variant="outlined"
                            value={formData.Remarks}
                            onChange={handleChange}
                            fullWidth
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent="center" alignItems="center" gap={1}>
                    <Button type="submit" variant="outlined" color="primary" size="large">
                    {loading ? (
                        <CircularProgress />
                    ) : "Submit"}
                    </Button>
                    <Button variant='text' onClick={()=>{navigate('/home')}}>Back</Button>
                </Grid>
                </Grid>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={1000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleClose}

            >
                <Alert
                    severity={severity}
                    sx={{ width: '100%' }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Snackbar>
        </FormContainer>
        </>
    );
};

export default FormPage;
