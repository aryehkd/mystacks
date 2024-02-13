import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../src/theme'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const StorybookThemeProvider = (Story: React.FC) => {

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Story />
             </LocalizationProvider>
        </ThemeProvider>
    )
}