import { styled } from '@mui/material/styles';
import { Box, Grid, TextField, Button } from '@mui/material'

/* eslint-disable-next-line */
export interface BookInputProps {}

const StyledTextFieldContainer = styled(Grid)(({ theme }) => ({
  paddingRight: '10px'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '100%'
}));

export function BookInput(props: BookInputProps) {
  return (
     <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <StyledTextFieldContainer item xs={10}>
          <StyledTextField id="book-input" label="Book Title" variant="outlined" />
        </StyledTextFieldContainer>
        <Grid item xs={2}>
          <StyledButton variant="outlined">Search</StyledButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BookInput;
