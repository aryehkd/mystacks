import React from 'react'
import { Box, Paper, Typography, IconButton } from '@mui/material/';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

/* eslint-disable-next-line */
export interface CardProps {
    title: string
    subtitle?: string
    imgUrl?: string
    cardClickAction?: (param: any) => void 
  }

export const Card = (props: CardProps) => {
    const { title, subtitle, imgUrl, cardClickAction } = props;

    return (
        <StyledBox className='card'>
            <BookInfoContainer>
                {imgUrl &&
                    <img
                        src={`${imgUrl}?w=164&h=164&fit=crop&auto=format`}
                        alt={title+"-img"}
                        loading="lazy"
                        style={{cursor: "pointer", width: "100px", height: "auto"}}
                    />
                }
                <TextContainer>
                    <StyledTitle variant="h6" className="card-text">
                        {title}
                    </StyledTitle>
                    {subtitle && 
                        <StyledSubTitle variant="subtitle2" className="card-text">
                            {subtitle}
                        </StyledSubTitle>
                    }
                </TextContainer>
            </BookInfoContainer>
            <StyledAddButton aria-label="add">
                <AddCircleIcon />
            </StyledAddButton>
        </StyledBox>
    )
}

export default Card;


const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
}));

const TextContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "0 0 0 20px"
}));

const BookInfoContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
    marginTop: "20px",
    cursor: "pointer",
}));

const StyledAddButton = styled(IconButton)(({ theme }) => ({
    height: "40px"
}));

const StyledSubTitle = styled(Typography)(({ theme }) => ({
    cursor: "pointer",
}));