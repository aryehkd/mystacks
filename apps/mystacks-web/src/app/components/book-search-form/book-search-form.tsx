import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import { OutlinedTextInput, PrimaryButton } from '../../elements';

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
    <FormRoot>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={10}>
          <OutlinedTextInput 
            id="book-search-form" 
            label="Book Title" 
            value={inputValue}
            handleChange={handleChange}
          />
        </Grid>
        <ButtonGridItem item xs={12} sm={2}>
          <SearchButton onClick={() => handleSearchClick(inputValue)}>
            Search
          </SearchButton>
        </ButtonGridItem>
      </Grid>
    </FormRoot>
  );
}

export default BookSearchForm;

const FormRoot = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
}));

const ButtonGridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'flex-start',
  },
}));

const SearchButton = styled(PrimaryButton)(({ theme }) => ({
  width: 'auto',
  minWidth: 100,
}));
