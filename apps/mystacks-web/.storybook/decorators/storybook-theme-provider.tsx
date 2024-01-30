import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../src/theme'


export const StorybookThemeProvider = (Story: any) => {

    return (
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    )
}