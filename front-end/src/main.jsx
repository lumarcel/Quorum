import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
palette: {
  primary: {
    main: '#667eea',
  },
  secondary: {
    main: '#764ba2',
  },
  success: {
    main: '#4caf50',
  },
  error: {
    main: '#f44336',
  },
},
typography: {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h3: {
    fontWeight: 700,
  },
  h5: {
    fontWeight: 600,
  },
},
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
},
});

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
</React.StrictMode>
);