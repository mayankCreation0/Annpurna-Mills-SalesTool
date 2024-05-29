import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../Api/Apis';
import { Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import LoanBookChart from '../Components/LoanBookChart';
import LoanAmountBarChart from '../Components/RepaidChart';
import Statistics from '../Components/Statistics';
import Chart from '../Components/CountCharts';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://annpurna-mills.vercel.app/">
       Annpurna Mills
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);
  const storeData = useSelector(state => state.analytics);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const fetchData = async () => {
      await getAnalytics(dispatch, navigate);
    };
    if (Object.keys(storeData).length <= 0) {
      fetchData();
    }
  }, [dispatch]);

  return (
    <div>
      { Object.keys(storeData).length > 0 && (
        <Box sx={{ display: 'flex' ,bgcolor:"applicationTheme.primary"}}>
          <Box
            component="main"
            sx={{
              bgcolor:"transparent",
              flexGrow: 1,
              padding: { xs: 2, sm: 3, md: 4 }, // Add padding for all screen sizes
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <Statistics />
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
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
              {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
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
              </Box> */}
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      )}
      
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

export default Home;
