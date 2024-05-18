import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from './Charts.jsx';
import Title from './Title';
import LoanAmountBarChart from './AmountChart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../Helpers/apis';
import Deposits from './Deposits.jsx';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Dashboard() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);

    const fetchData = async () => {
        await getAnalytics(dispatch);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

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
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        <Chart />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    >
                                        <Deposits/>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 'auto',
                                        }}
                                    >
                                        <LoanAmountBarChart />
                                        <React.Fragment>
                                            <Title>Recent Deposits</Title>
                                            <Typography component="p" variant="h4">
                                                $3,024.00
                                            </Typography>
                                            <Typography color="text.secondary" sx={{ flex: 1 }}>
                                                on 15 March, 2019
                                            </Typography>
                                            <div>
                                                <Link color="primary" href="#">
                                                    View balance
                                                </Link>
                                            </div>
                                        </React.Fragment>
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
