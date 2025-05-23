import React from 'react'
import { PageProps } from '@mystacks/types'
import { BookSearch } from '../components/book-search/book-search';
import { CustomAppBar } from '../components/app-bar/app-bar';
import { Box, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';

/* eslint-disable-next-line */
export interface BookSearchPageProps extends PageProps {

}

export const BookSearchPage = (props: BookSearchPageProps) => {
    const { state } = useLocation();

    return (
        <CustomAppBar logoSize='sm' appState={props.appState}>
            <SearchInnerContainer>
                <BookSearch navSearchQuery={state?.navSearchQuery} />

            </SearchInnerContainer>
        </CustomAppBar>
    )
}

export default BookSearchPage;

const SearchInnerContainer = styled(Box)(({ theme }) => ({
    width: "80%",
    margin: "50px 0 0 0",
    minHeight: "65vh",
}));