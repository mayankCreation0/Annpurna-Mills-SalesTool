import React, { useState } from 'react';
import { TextField, Button, Grid, Snackbar, Alert, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { postFormData } from '../Helpers/apis';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const FormContainer = styled('div')({
    maxWidth: '90vw',
    margin: 'auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    marginTop: '100px',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { state } = await postFormData(formData, dispatch);
        if (state === 'success') {
            setOpen(true);
            setSeverity('success');
            setMessage('form data submitted successfully');
            navigate('/coustomerLists');
        } else {
            setOpen(true);
            setSeverity('error');
            setMessage('Something went wrong, please try again');
        }
    };

    return (
        <FormContainer>
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            name="Gender"
                            label="Gender"
                            value={formData.Gender}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="others">Others</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            name="Status"
                            label="Status"
                            value={formData.Status}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="Address"
                            label="Address"
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
                            value={formData.Rate}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            name="Category"
                            label="Category"
                            value={formData.Category}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="Gold">Gold</MenuItem>
                            <MenuItem value="Silver">Silver</MenuItem>
                            <MenuItem value="Bronze">Bronze</MenuItem>
                            <MenuItem value="Bike">Bike</MenuItem>
                            <MenuItem value="Cycle">Cycle</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="Weight"
                            label="Weight"
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
                            value={formData.Date}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="PhoneNumber"
                            label="Phone Number"
                            value={formData.PhoneNumber}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="Remarks"
                            label="Remarks"
                            value={formData.Remarks}
                            onChange={handleChange}
                            fullWidth
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
            >
                <Alert
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </FormContainer>
    );
};

export default FormPage;
