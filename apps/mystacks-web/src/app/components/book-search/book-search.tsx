import React from 'react'
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useBookSearchForm } from '@mystacks/book-search-form'
import { useSavedBooks } from '@mystacks/saved-books'
import { BookSearchForm } from '../book-search-form';
import { BookSearchResults } from '../book-search-results';

/* eslint-disable-next-line */
export interface BookSearchProps {

}

export const BookSearch = (props: BookSearchProps) => {
    const { savedBooks, addSavedBook } = useSavedBooks()

    const { 
        inputValue,
        searchResults,
        handleInputValueChange,
        handleBookSeach,
        saveBook
     } = useBookSearchForm(addSavedBook)
    
    return (
        <StyledBox>
            <BookSearchForm inputValue={inputValue} handleInputValueChange={handleInputValueChange} handleBookSeach={handleBookSeach}/>
            <BookSearchResults SearchResults={searchResults} saveBook={saveBook}/>

        </StyledBox>
    )
}

export default BookSearch;


const StyledBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
}));
