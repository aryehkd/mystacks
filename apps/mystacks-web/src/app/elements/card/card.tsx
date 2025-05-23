import React from 'react'
import { Box, Typography, IconButton } from '@mui/material/';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { Book } from '@mystacks/types';

/* eslint-disable-next-line */
export interface CardProps {
    book: Book
  }

export const Card = (props: CardProps) => {
    const { bookInfo } = props.book;


    // TODO move out of here
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/book-info', { state: { book: {...props.book}, lastPage: "/search" } });
    }

    return (
        <StyledBox className='card'>
            <BookInfoContainer>
                {bookInfo.imgUrl &&
                    <img
                        src={`${bookInfo.imgUrl}?w=164&h=164&fit=crop&auto=format`}
                        alt={bookInfo.title+"-img"}
                        loading="lazy"
                        style={{cursor: "pointer", width: "100px", height: "auto"}}
                    />
                }
                <TextContainer>
                    <StyledTitle variant="h6" className="card-text">
                        {bookInfo.title}
                    </StyledTitle>
                    {bookInfo.author && 
                        <StyledSubTitle variant="subtitle2" className="card-text">
                            {bookInfo.author}
                        </StyledSubTitle>
                    }
                </TextContainer>
            </BookInfoContainer>
            <StyledAddButton aria-label="add" onClick={handleAdd}>
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