import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import { Provider } from 'react-redux';
import { store } from './utils/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './assets/fonts/fonts.css'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
<React.StrictMode>
<ThemeProvider theme={theme}>

    <Provider store={store}>
      <App />
    </Provider>

</ThemeProvider>
  </React.StrictMode>
)