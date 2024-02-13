import React from 'react';
import { Box, Typography, TextField, IconButton, styled } from '@mui/material'
import { PrimaryButton, DeleteButton } from '../button/button';
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
                    <StyledInput 
                        value={tempISBN}
                        label="ISBN"
                        size='small'
                        type='number'
                        color='secondary'
                        error={isbnError ? true : false}
                        helperText={isbnError && isbnError}
                        onChange={(event) => handleTempISBNChange(event.target.value)}
                    />
                    <ButtonContainer>
                        <PrimaryButton onClick={handleSaveClick}>Update</PrimaryButton>
                        <Box sx={{marginLeft: "5px"}}>
                            <DeleteButton onClick={handleCancelClick}>Cancel</DeleteButton>
                        </Box>
                    </ButtonContainer>
                </StyledContainer>
                :
                <StyledContainer>
                    <Typography variant="subtitle2" sx={{marginRight: "10px", paddingTop: "5px"}}>ISBN: {isbn}</Typography>
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
    alignItems: "flex-start",
    flexWrap: "wrap",
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        justifyContent: "center",
    },
}));

const StyledInput = styled(TextField)(({ theme }) => ({
    width: "100%",
    marginRight: "14px",
    [theme.breakpoints.up("md")]: {
        marginRight: "10px",
    },
    '& fieldset': {
        borderColor: '#808080',
        borderWidth: 3,
    },
    '& .MuiFormControl-root': {
        color: "#808080"
    }
}));

