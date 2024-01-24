import React from 'react'
import { Box} from '@mui/material/';
import { styled } from '@mui/material/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Book } from '@mystacks/types'
import { Card } from '../card'

/* eslint-disable-next-line */
export interface BookSearchResultsProps {
  SearchResults: Book[]
}

export function BookSearchResults(props: BookSearchResultsProps) {
  const { SearchResults } = props

  const sliderSettings = {
    speed: 1,
    slidesToShow: SearchResults.length > 4 ? 4 : SearchResults.length,
    slidesToScroll: 1,
    infinite: false,
    draggable: true,
  };

  return (
    <StyledBox>
      <Slider {...sliderSettings}>
        {SearchResults.map(item => <div><Card title={item.title} subtitle={item.author} imgUrl={item.imgUrl}/></div>)}      
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