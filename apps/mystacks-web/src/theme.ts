import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
        main: '#006300',
        contrastText: '#FFFFFF',
      },
    secondary: {
        main: '#9d34ad',
        light: '#e1c0e6',
        dark: '#6d2696',
        contrastText: '#FFFFFF',
    },
  },
});