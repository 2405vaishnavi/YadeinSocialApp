import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducer';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import App from './App';
import './index.css';

const theme = createTheme(); // Create a theme instance

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}> 
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
