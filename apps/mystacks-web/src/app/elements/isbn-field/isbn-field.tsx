import React, { useEffect } from 'react';
import { Box, Typography, TextField, IconButton, styled } from '@mui/material'
import { PrimaryButton } from '../button/button';
import EditIcon from '@mui/icons-material/Edit';

export interface ISBNFieldProps {
    isbn: string
    handleISBNChange: (newValue: string) => void
}

export const ISBNField: React.FC<ISBNFieldProps> = (props: ISBNFieldProps) => {
    const { isbn, handleISBNChange } = props;

    const [ editing, setEditing ] = React.useState(false);
    const [ editISBN, setEditISBN ] = React.useState(isbn);

    useEffect(() => {
        if (editing) {
            setEditing(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isbn])

    const handleSaveClick = () => {
        handleISBNChange(editISBN)
    }

    return (
        <Box>
            {editing ?
                <StyledContainer>
                    <TextField 
                        value={editISBN}
                        label="ISBN"
                        size='small'
                        type='number'
                        color='secondary'
                        onChange={(event) => setEditISBN(event.target.value)}
                        sx={{marginRight: "10px"}}
                    />
                    <PrimaryButton onClick={handleSaveClick}>Update</PrimaryButton>
                </StyledContainer>
                :
                <StyledContainer>
                    <Typography>ISBN:</Typography>
                    <Typography>{isbn}</Typography>
                    <IconButton onClick={() => setEditing(true)}><EditIcon/></IconButton>
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
    alignItems: "baseline",
}));
