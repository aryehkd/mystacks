import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material'
import { OutlinedTextInput, PrimaryButton } from "../../elements" 

/* eslint-disable-next-line */
export interface BookSearchFormProps {
  inputValue: string
  handleInputValueChange: (newInputValue: string) => void
  handleSearchClick: (searchQuery: string) => void
}

export function BookSearchForm(props: BookSearchFormProps) {
  const { inputValue, handleInputValueChange, handleSearchClick } = props

  const handleChange = (newValue: string, id: string) => {
    handleInputValueChange(newValue);
  }

  return (
     <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <StyledTextFieldContainer item xs={10}>
          <OutlinedTextInput 
            id="book-search-form" 
            label="Book Title" 
            value={inputValue}
            handleChange={handleChange}
          />
        </StyledTextFieldContainer>
        <Grid item xs={2} sx={{paddingTop: "15px"}}>
          <PrimaryButton onClick={() => handleSearchClick(inputValue)}>Search</PrimaryButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BookSearchForm;

const StyledTextFieldContainer = styled(Grid)(({ theme }) => ({
  paddingRight: '10px'
}));
