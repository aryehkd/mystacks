import { AIRecommendation, Book } from "@mystacks/types"
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material/';
import { useNavigate } from "react-router-dom";
import CoverImage from "../cover-image/CoverImage";
import { LastPage } from "@mui/icons-material";

export interface BookItemProps {
    book: Book
}  

export const BookItem = (props: BookItemProps) => {
    const { bookInfo } = props.book

    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/book-info', { state: { bookId: props.book.id, LastPage: '/' } });
    }


    return (
        <StyledBox className='card' onClick={handleBookClick}>
            <CoverImage imgUrl={bookInfo.imgUrl}/>
            
            <StyledTitle variant="subtitle1" className="card-text">
                {bookInfo.title}
            </StyledTitle>
            {bookInfo.author && 
                <StyledSubTitle variant="subtitle2" className="card-text">
                    {bookInfo.author}
                </StyledSubTitle>
            }
        </StyledBox>
    )
}

// TODO: move this to its own component

export interface AIRecommendationItemProps {
    book: AIRecommendation
}  

export const RecommendationItem = (props: AIRecommendationItemProps) => {
    const { bookInfo } = props.book

    // const navigate = useNavigate();

    const handleBookClick = () => {
        // navigate('/book-info', { state: { book: { ...props.book } } });
    }

    console.log('')


    return (
        <StyledRecommendationBox className='card' onClick={handleBookClick}>
            <PrimaryContentsBox>
                <CoverImage imgUrl={bookInfo.imgUrl}/>
                
                <StyledTitle variant="subtitle1" className="card-text">
                    {bookInfo.title}
                </StyledTitle>
                {bookInfo.author && 
                    <StyledSubTitle variant="subtitle2" className="card-text">
                        {bookInfo.author}
                    </StyledSubTitle>
                }

            </PrimaryContentsBox>

            <SecondaryContentsBox className="secondary-info">
                <StyledSubTitle variant="subtitle1">
                    {props.book.recommendation}
                </StyledSubTitle>
                <Button variant="outlined" sx={{marginTop: "20px"}}>Save</Button>
            </SecondaryContentsBox>
        </StyledRecommendationBox>
    )
}

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100px",


}));

const StyledRecommendationBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    width: "100px",
    transition: "width .5s ease-in-out",

    "& .secondary-info": {
        opacity: 0,
        transition: "opacity 0s ease-in"
    },

    "&:hover": {
        cursor: "pointer",
        width: "500px",

        "& .secondary-info": {
            display: "block",
            opacity: "100%",
            transition: "opacity .25s",
            transitionDelay: ".5s",
        },
    }
}));

const PrimaryContentsBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
}));

const SecondaryContentsBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    margin: "10px 40px"
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    marginTop: "20px",
    cursor: "pointer",
    textWrap: "wrap",
    overflow: "hidden",
    lineHeight: "1.2em",
    maxHeight: "2.4em"
}));

const StyledSubTitle = styled(Typography)(({ theme }) => ({
    cursor: "pointer",
}));