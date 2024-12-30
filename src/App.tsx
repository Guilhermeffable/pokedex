import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AppContextProvider } from 'context';
import MainPage from 'pages/MainPage';

import './assets/styles/main.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Details from 'pages/Details';
import MyPokedex from 'pages/MyPokedex';

const theme = createTheme({
  typography: { fontFamily: 'Pokemon, sans-serif' }
});

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/details' element={<Details />} />
            <Route path='/my-pokedex' element={<MyPokedex />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
