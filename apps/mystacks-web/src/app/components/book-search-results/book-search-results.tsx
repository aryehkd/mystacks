import React from 'react'
import { Box} from '@mui/material/';
import { styled } from '@mui/material/styles';

import { Book } from '@mystacks/types'
import { Card } from '../../elements/card'

/* eslint-disable-next-line */
export interface BookSearchResultsProps {
  SearchResults: Book[]
  saveBook?: (toSave: Book) => void
}

export const BookSearchResults = (props: BookSearchResultsProps) => {
  const { SearchResults, saveBook } = props

  // TODO: search results should probably just be a list with pagination on desktop
    // and then also just be a grid of titles authors and covers on mobile
  return (
    <StyledBox>
        {SearchResults.map(item => <CardContainer><Card title={item.title} subtitle={item.author} imgUrl={item.imgUrl} cardClickAction={saveBook}/></CardContainer>)}      
    </StyledBox>

  );
}

export default BookSearchResults;

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "20px 0",

  display: "flex",
  flexDirection: "column",
}));

const CardContainer = styled(Box)(({ theme }) => ({
  margin: "10px 0"
}));