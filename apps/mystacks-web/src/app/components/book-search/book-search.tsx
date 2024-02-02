import React from 'react'
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useBookSearchForm } from '@mystacks/book-search-form'
import { useSavedBooks } from '@mystacks/saved-books'
import { BookSearchForm } from '../book-search-form';
import { BookSearchResults } from '../book-search-results';

/* eslint-disable-next-line */
export interface BookSearchProps {

}

export const BookSearch = (props: BookSearchProps) => {

    const { 
        inputValue,
        searchResults,
        handleInputValueChange,
        handleBookSeach,
     } = useBookSearchForm()
    
    return (
        <StyledBox>
            <BookSearchForm inputValue={inputValue} handleInputValueChange={handleInputValueChange} handleBookSeach={handleBookSeach}/>
            <BookSearchResults SearchResults={searchResults}/>

        </StyledBox>
    )
}

export default BookSearch;


const StyledBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
}));
