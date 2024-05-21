import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from './CountCharts.jsx'; 
import LoanAmountBarChart from './RepaidChart.jsx';
import { useSelector } from 'react-redux';
import Statistics from './Statistics.jsx';
import LoanBookChart from './LoanBookChart.jsx';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://annpurna-mills.vercel.app/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Dashboard() {
    const loading = useSelector(state => state.analytics.loading);

    return (
        <>
            {!loading ? (
                <Box sx={{ display: 'flex' }}>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            // height: '100vh',
                            // overflow: 'auto',
                        }}
                    >
                        <Container maxWidth="lg" sx={{ paddingTop: 2}}>
                            <Grid container spacing={3} justifyContent='center'>
                                <Grid item xs={12} >
                                    <Statistics />
                                </Grid>
                                <Grid item xs={12} md={8} lg={9} >
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '300px',
                                            width: '100%',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <Chart />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 'auto',
                                        }}
                                    >
                                        <LoanAmountBarChart />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 'auto',
                                        }}
                                    >
                                        <LoanBookChart />
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
                                <Paper sx={{ p: 2 }}>
                                    <iframe
                                        src="https://goldbroker.com/widget/historical/XAU?height=500&currency=INR&weight_unit=g"
                                        scrolling="yes"
                                        frameBorder="0"
                                        width="100%"
                                        height="500"
                                        style={{
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    ></iframe>
                                </Paper>
                                <Paper sx={{ p: 2 }}>
                                    <iframe
                                        src="https://goldbroker.com/widget/historical/XAG?height=500&currency=INR&weight_unit=kg"
                                        scrolling="yes"
                                        frameBorder="0"
                                        width="100%"
                                        height="500"
                                        style={{
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    ></iframe>
                                </Paper>
                            </Box>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}
