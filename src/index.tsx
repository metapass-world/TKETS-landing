import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';

import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { themeLightOptions } from './theme'
import { ThemeProvider } from '@material-ui/core';

const theme = createTheme(themeLightOptions)
const responsiveTheme = responsiveFontSizes(theme, {breakpoints: ['md']})

declare global {
  interface Window {
      ethereum: any;
  }
}

ReactDOM.render(
  <ThemeProvider theme={responsiveTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

