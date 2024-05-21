import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Typography, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getDetailsById } from '../Api/Apis';

const ViewPage = () => {
    const [customer, setCustomer] = useState(null);
    const [interest, setInterest] = useState(0);
    const [month, setMonth] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await getDetailsById(id, dispatch,navigate);
        setCustomer(res.data);
        calculateMonthlySimpleInterest(res.data.Amount, res.data.Rate, res.data.Date);
    };

    function calculateMonthlySimpleInterest(principal, monthlyRate, startDate) {
        const start = new Date(startDate);
        const end = new Date();

        // Determine exclusion rules based on principal amount
        const startExclusionDay = principal <= 3500 ? 6 : 10;
        const endExclusionDay = principal <= 3500 ? 10 : 13;

        // Exclude start month if the start date is within the last `startExclusionDay` days of the month
        const daysInStartMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
        if (start.getDate() > daysInStartMonth - startExclusionDay) {
            start.setMonth(start.getMonth() + 1);
            start.setDate(1);
        }

        // Exclude end month if the end date is within the first `endExclusionDay` days of the month
        if (end.getDate() <= endExclusionDay) {
            end.setMonth(end.getMonth() - 1);
            end.setDate(new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate());
        }

        // Calculate the number of full months between the adjusted start and end dates
        const fullMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
setMonth(fullMonths);
        // Calculate the simple interest for the full months
        const simpleInterest = (principal * monthlyRate * fullMonths) / 100;
        setInterest(simpleInterest)
        // return simpleInterest;
    }



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
            <Paper sx={{ padding: '2rem', position: 'relative', }}>
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
                                <Typography variant="body1">{customer.Category}</Typography>
                                <Typography variant="body1">{interest}</Typography>
                                <Typography variant="body1">{month}</Typography>
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
