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
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { postFormData } from '../Helpers/apis';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const FormContainer = styled('div')({
    maxWidth: '90vw',
    margin: 'auto',
    padding: '2rem',
    border: 'none', // Remove border for a cleaner look
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f0f2f5', // Light background color for better readability
});

const FormHeading = styled(Typography)({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
});

const FormPage = () => {
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
            navigate('/coustomerLists');
        } else {
            setOpen(true);
            setSeverity('error');
            setMessage('Something went wrong, please try again');
        }
    };

    return (
        <FormContainer>
            <FormHeading variant="h6">Form Title</FormHeading> {/* Replace with your desired title */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="Name"
                            label="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true, // Reduce label movement on focus
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
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
                        <FormControl fullWidth>
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
                            value={formData.Address}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            name="Amount"
                            label="Amount"
                            value={formData.Amount}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            name="Rate"
                            label="Rate"
                            value={formData.Rate}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
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
                        <TextField
                            name="Weight"
                            label="Weight"
                            value={formData.Weight}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="date"
                            name="Date"
                            label="Date"
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
                            value={formData.PhoneNumber}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="Remarks"
                            label="Remarks"
                            value={formData.Remarks}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
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
    );
};

export default FormPage;