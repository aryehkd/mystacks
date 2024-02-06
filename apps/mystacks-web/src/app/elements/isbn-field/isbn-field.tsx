import React from 'react';
import { Box, Typography, TextField, IconButton, styled } from '@mui/material'
import { PrimaryButton } from '../button/button';
import EditIcon from '@mui/icons-material/Edit';
import { useISBNField } from './useISBNField';

export interface ISBNFieldProps {
    isbn: string
    isbnError: string | undefined
    handleISBNChange: (newValue: string) => void
}

export const ISBNField: React.FC<ISBNFieldProps> = (props: ISBNFieldProps) => {
    const { isbn, isbnError, handleISBNChange } = props;

    const { editing, tempISBN, handleCancelClick, handleSaveClick, handleTempISBNChange, handleEditingChange } = useISBNField(isbn, handleISBNChange)

    return (
        <Box sx={{marginTop: "10px"}}>
            {editing ?
                <StyledContainer>
                    <TextField 
                        value={tempISBN}
                        label="ISBN"
                        size='small'
                        type='number'
                        color='secondary'
                        error={isbnError ? true : false}
                        helperText={isbnError && isbnError}
                        onChange={(event) => handleTempISBNChange(event.target.value)}
                        sx={{marginRight: "10px"}}
                    />
                    <PrimaryButton onClick={handleSaveClick}>Update</PrimaryButton>
                    <Box sx={{marginLeft: "5px"}}>
                        <PrimaryButton onClick={handleCancelClick}>Cancel</PrimaryButton>
                    </Box>
                </StyledContainer>
                :
                <StyledContainer>
                    <Typography variant="body1" sx={{marginRight: "10px"}}>ISBN: {isbn}</Typography>
                    <IconButton size='small' onClick={() => handleEditingChange(true)}><EditIcon fontSize="small" /></IconButton>
                </StyledContainer>
            }
        </Box>
    )
};

export default ISBNField;


const StyledContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}));
