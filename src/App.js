import './App.css';
import AllRoutes from './Routes/Routes';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import getLPTheme from './Components/GetLptTheme';

function App() {
  const [mode, setMode] = React.useState('light');
  const LPtheme = createTheme(getLPTheme(mode));

  return (
    <div className="App">
      <ThemeProvider theme={mode ? LPtheme : '' }>
           <AllRoutes/>
      </ThemeProvider>
    </div>
  );
}

export default App;





 // const defaultTheme = createTheme({ palette: { mode } });

  /* const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }; */
  //  const [showCustomTheme, setShowCustomTheme] = React.useState(true); */

  