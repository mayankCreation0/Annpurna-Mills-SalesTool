import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getDetailsById } from '../Helpers/apis';
import Navbar from '../Components/Navbar';

const ViewPage = ({ mode, toggleColorMode }) => {
    const [customer, setCustomer] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();

    const fetchData = async () => {
        const res = await getDetailsById(id, dispatch);
        setCustomer(res.data);
    };

    useEffect(() => {
        fetchData();
    }, [id, dispatch]);

    if (!customer) {
        return <div>Loading customer details...</div>;
    }

    const getAvatarUrl = () => {
        if (customer.Gender?.toLowerCase() === 'male') {
            return 'path/to/male.png'; // Replace with your actual male avatar path
        } else if (customer.Gender?.toLowerCase() === 'female') {
            return 'path/to/female.png'; // Replace with your actual female avatar path
        } else {
            return 'path/to/default.png'; // Replace with your default avatar path
        }
    };

    return (
        <>
            <Navbar mode={mode} toggleColorMode={toggleColorMode} />
            <Paper sx={{ padding: '2rem', position: 'relative', top: '65px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={getAvatarUrl()} sx={{ mr: 2, width: 60, height: 60 }} />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {customer.Name}
                                </Typography>
                                <Typography variant="body1">
                                    {customer.Gender} - {customer.PhoneNumber}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1">Address:</Typography>
                                <Typography variant="body1">{customer.Address}</Typography>
                                {/* Add more details as needed */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1">Amount:</Typography>
                                <Typography variant="body1">{customer.Amount}</Typography>
                                <Typography variant="subtitle1">Rate:</Typography>
                                <Typography variant="body1">{customer.Rate}</Typography>
                                <Typography variant="subtitle1">Category:</Typography>
                                <Typography variant="body1">{customer.Category}</Typography>
                                {/* Add more details as needed */}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {customer.Image && (
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={customer.Image}
                                    alt="Customer Image"
                                />
                            </Card>
                        )}
                        {/* Add details specific to the right side if needed */}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ViewPage;
