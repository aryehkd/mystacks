import React from 'react'
import { Box, Paper, Typography } from '@mui/material/';
import { styled } from '@mui/material/styles';
import { Book } from '@mystacks/types'
import { Card } from '../card'

/* eslint-disable-next-line */
export interface BookSearchResultsProps {
  SearchResults: Book[]
}

export function BookSearchResults(props: BookSearchResultsProps) {
  const { SearchResults } = props

  return (
    <StyledBox>
      {SearchResults.map(item => <Card title={item.title} subtitle={item.author} imgUrl={item.imgUrl}/>)}
    </StyledBox>
  );
}

export default BookSearchResults;

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",

  "& > .card": {
    margin: "20px 20px;"
  },

  "& .card-text": {
    lineHeight: "1.5em",
    height: "1.5em",
    overflow: "hidden",
  }
}));