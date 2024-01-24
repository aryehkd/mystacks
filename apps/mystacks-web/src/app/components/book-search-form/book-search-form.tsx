import { styled } from '@mui/material/styles';
import { Box, Grid, TextField, Button } from '@mui/material'

/* eslint-disable-next-line */
export interface BookSearchFormProps {
  inputValue: string
  handleInputValueChange: (newInputValue: string) => void
  handleBookSeach: () => void
}

export function BookSearchForm(props: BookSearchFormProps) {
  const { inputValue, handleInputValueChange, handleBookSeach } = props

  return (
     <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <StyledTextFieldContainer item xs={10}>
          <StyledTextField 
            id="book-search-form" 
            label="Book Title" 
            variant="outlined" 
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputValueChange(event.target.value);
            }}
          />
        </StyledTextFieldContainer>
        <Grid item xs={2}>
          <StyledButton variant="outlined" onClick={handleBookSeach}>Search</StyledButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BookSearchForm;

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
