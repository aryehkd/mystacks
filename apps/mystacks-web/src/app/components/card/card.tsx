import React from 'react'
import { Box, Paper, Typography } from '@mui/material/';
import { styled } from '@mui/material/styles';


/* eslint-disable-next-line */
export interface CardProps {
    title: string
    subtitle?: string
    imgUrl?: string
  }

export const Card = (props: CardProps) => {
    const { title, subtitle, imgUrl } = props;

    return (
        <StyledBox className='card'>
            <StyledPaper>
                {imgUrl &&
                    <img
                        src={`${imgUrl}?w=164&h=164&fit=crop&auto=format`}
                        alt={title+"-img"}
                        loading="lazy"
                        style={{cursor: "pointer", width: "150px", height: "auto"}}
                    />
                }
                <StyledTitle variant="h6" className="card-text">
                    {title}
                </StyledTitle>
                {subtitle && 
                    <StyledSubTitle variant="subtitle2" className="card-text">
                        {subtitle}
                    </StyledSubTitle>
                }
            </StyledPaper>
        </StyledBox>
    )
}

export default Card;


const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 20px",
    cursor: "pointer",

    "&:hover": {
        background: '#F0F7FF',

        "& > .card-text": {
            // TODO: add theme and colors, text styled, etc
            color: "#0072E5"
        }
    }
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    marginTop: "20px",
    cursor: "pointer",
}));

const StyledSubTitle = styled(Typography)(({ theme }) => ({
    cursor: "pointer",
}));