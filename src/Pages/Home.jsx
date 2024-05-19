// Home.js
import React from 'react';
import Dashboard from '../Components/Dashboard';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../Helpers/apis';
import { CircularProgress } from '@mui/material';

const Home = ({ mode, toggleColorMode }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);
  const storeData = useSelector(state => state.analytics);
  console.log("Dashboard loaded", Object.keys(storeData).length, "loading", loading);

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
          <Navbar mode={mode} toggleColorMode={toggleColorMode} />
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
