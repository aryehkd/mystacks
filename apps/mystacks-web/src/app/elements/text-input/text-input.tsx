import React from 'react'
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface TextInputProps {
    id: string
    label: string
    value: string
    handleChange: (newValue: string, id: string) => void
    type?: 'password' | undefined
}

export const OutlinedTextInput = (props: TextInputProps) => {
    const { id, label, value, handleChange, type } = props
    
    return (
        <StyledTextField 
            id={id}
            label={label} 
            variant="outlined" 
            value={value}
            autoComplete='off'
            type={type??''}
            color="secondary"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(event.target.value, id);
            }}
            InputLabelProps={{
                sx: {
                    color: 'black'
                }
            }}
        />
    )
}


const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    margin: "10px 0",
    '& fieldset': {
        borderColor: 'black',
        borderWidth: 4,
    },
    '& .MuiFormControl-root': {
        color: "black"
    }

}));
