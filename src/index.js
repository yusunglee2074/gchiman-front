import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import AppRouter from './routers/AppRouter'
import './styles/styles.scss'
import 'normalize.css/normalize.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  

axios.defaults.baseURL = 'http://localhost:3000';

const theme = createMuiTheme({
  typography: { 
    htmlFontSize: 16,
    fontSize: '1.4rem',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  }
})

ReactDOM.render(<MuiThemeProvider theme={theme}>
  <AppRouter />
  </MuiThemeProvider>, document.getElementById('root'));

