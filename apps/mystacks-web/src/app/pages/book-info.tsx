import React from 'react';
import { Book, PageProps } from '@mystacks/types';
import { useLocation } from 'react-router-dom';
import { BookInfo } from '../components/book-info';
import { CustomAppBar } from '../components/app-bar/app-bar';
import { Box, styled } from '@mui/material';
import { useBookInfo } from '@mystacks/hooks';

/* eslint-disable-next-line */
export interface BookInfoPageProps extends PageProps {}

export const BookInfoPage = (props: BookInfoPageProps) => {
  const { state } = useLocation();

  const bookInfoProps = useBookInfo(props.appState, state?.book, state?.bookId, state?.lastPage);

  return (
    <CustomAppBar logoSize="sm" appState={props.appState}>
      <BookInfoInnerContainer>
        {bookInfoProps.bookLoaded && (
          <BookInfo
            book={bookInfoProps.currentBook as Book}
            {...bookInfoProps}
          />
        )}
      </BookInfoInnerContainer>
    </CustomAppBar>
  );
};

export default BookInfoPage;

const BookInfoInnerContainer = styled(Box)(({ theme }) => ({
  margin: '20px 0 0 0',
  minHeight: '0vh',

  [theme.breakpoints.up('md')]: {
    margin: '50px 0 0 0',
  },
}));
