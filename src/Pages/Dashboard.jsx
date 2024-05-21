// Home.js
import React from 'react';
import Dashboard from '../Components/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../Api/Apis';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);
  const storeData = useSelector(state => state.analytics);

  React.useEffect(() => {
    const fetchData = async () => {
      await getAnalytics(dispatch);
    };

    fetchData();
  }, [dispatch]);


  return (
    <div>
      {!loading && Object.keys(storeData).length > 0 ? (
        <>
          <Dashboard />
        </>
      ) : (
        <div style={styles.loaderContainer}>
          <CircularProgress />
        </div>
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
