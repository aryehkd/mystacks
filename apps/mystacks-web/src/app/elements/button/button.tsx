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
        <StyledPrimaryButton 
            onClick={onClick}
            variant="contained"
            color="secondary"
        >
            {children}
        </StyledPrimaryButton>
    )
}

export const DeleteButton = (props: TextInputProps) => {
    const { onClick, children} = props
    
    return (
        <StyledButton 
            onClick={onClick}
            variant="outlined"
            color="secondary"
        >
            {children}
        </StyledButton>
    )
}


const StyledPrimaryButton = styled(Button)(({ theme }) => ({
    background: theme.palette.primary.contrastText,
    color: "white",
    height: "40px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.primary.contrastText,
    color: "black",
    height: "40px",
}));