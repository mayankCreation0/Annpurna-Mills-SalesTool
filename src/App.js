import './App.css';
import AllRoutes from './Helpers/Routes';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import getLPTheme from './Components/GetLptTheme';

function App() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  return (
    <div className="App">
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <AllRoutes mode={mode} toggleColorMode={toggleColorMode} />
      </ThemeProvider>
    </div>
  );
}

export default App;
