import React from 'react'
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useBookSearchForm } from '@mystacks/book-search-form'
import { BookSearchForm } from '../book-search-form';
import { BookSearchResults } from '../book-search-results';

/* eslint-disable-next-line */
export interface BookSearchProps {
    navSearchQuery?: string
}

export const BookSearch = (props: BookSearchProps) => {

    const { 
        inputValue,
        searchResults,
        handleInputValueChange,
        handleSearchClick,
     } = useBookSearchForm(props.navSearchQuery)
    
    return (
        <StyledBox>
            <BookSearchForm inputValue={inputValue} handleInputValueChange={handleInputValueChange} handleSearchClick={handleSearchClick}/>
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
