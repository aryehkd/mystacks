import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
        main: '#FFFFFF',
        light: '#c7e5c2',
        dark: '#217c15',
        contrastText: '#000000',
      },
    secondary: {
        main: '#9d34ad',
        light: '#e1c0e6',
        dark: '#6d2696',
        contrastText: '#FFFFFF',
    },
  },
});