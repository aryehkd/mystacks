import React from 'react'
import { Box} from '@mui/material/';
import { styled } from '@mui/material/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Book } from '@mystacks/types'
import { Card } from '../../elements/card'

/* eslint-disable-next-line */
export interface BookSearchResultsProps {
  SearchResults: Book[]
  saveBook?: (toSave: Book) => void
}

export function BookSearchResults(props: BookSearchResultsProps) {
  const { SearchResults, saveBook } = props

  const sliderSettings = {
    speed: 1,
    slidesToShow: SearchResults.length > 4 ? 4 : SearchResults.length,
    slidesToScroll: 1,
    infinite: false,
    draggable: true,
  };

  // TODO: search results should probably just be a list with pagination, not a slider
  return (
    <StyledBox>
      <Slider {...sliderSettings}>
        {SearchResults.map(item => <div><Card title={item.title} subtitle={item.author} imgUrl={item.imgUrl} cardClickAction={saveBook}/></div>)}      
      </Slider>
    </StyledBox>

  );
}

export default BookSearchResults;

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "20px 0",

  "& > .card": {
    margin: "20px 20px;"
  },

  "& .card-text": {
    lineHeight: "1.5em",
    height: "1.5em",
    overflow: "hidden",
  }
}));