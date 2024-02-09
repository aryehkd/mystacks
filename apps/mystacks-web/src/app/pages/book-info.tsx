import React from 'react'
import { PageProps } from '@mystacks/types'
import { useLocation } from 'react-router-dom';
import { BookInfo } from '../components/book-info'
import { CustomAppBar } from '../components/app-bar/app-bar';
import { Box, styled } from '@mui/material';
import { useBookInfo } from '@mystacks/book-search-form';

/* eslint-disable-next-line */
export interface BookInfoPageProps extends PageProps {

}

export const BookInfoPage = (props: BookInfoPageProps) => {
    const { state } = useLocation();
    const bookInfoProps = useBookInfo(state.book, props.appState)

    return (
        <CustomAppBar logoSize='sm'>
            <BookInfoInnerContainer>
                <BookInfo book={bookInfoProps.currentBook} {...bookInfoProps}/>

            </BookInfoInnerContainer>
        </CustomAppBar>
    )
}

export default BookInfoPage;

const BookInfoInnerContainer = styled(Box)(({ theme }) => ({
    margin: "20px 0 0 0",

    [theme.breakpoints.up("md")]: {
        margin: "50px 0 0 0",
    },
}));