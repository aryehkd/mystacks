import React from 'react'
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

interface TextInputProps {
    onClick: () => void
    children: React.ReactNode
}

export const PrimaryButton = (props: TextInputProps) => {
    const { onClick, children} = props
    
    return (
        <StyledButton 
            onClick={onClick}
            variant="contained"
        >
            {children}
        </StyledButton>
    )
}


const StyledButton = styled(Button)(({ theme }) => ({
    margin: "20px 0 15px 0",
    background: theme.palette.primary.contrastText,
    color: "white"
}));