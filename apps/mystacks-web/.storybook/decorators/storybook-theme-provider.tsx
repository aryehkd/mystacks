import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../src/theme'


export const StorybookThemeProvider = (Story: React.FC) => {

    return (
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    )
}