import React, { FC, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContextProvider } from 'context';
import Details from 'pages/Details/Details';
import MainPage from 'pages/MainPage/MainPage';
import './assets/styles/main.scss';
import MyPokedex from 'pages/MyPokedex/MyPokedex';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createLocalStorage } from 'utils/localStorage';

const theme = createTheme({
  typography: { fontFamily: 'Pokemon, sans-serif' }
});

const App: FC = () => {
  useEffect(() => {
    createLocalStorage();
  }, []);

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
