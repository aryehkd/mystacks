import { Book } from "@mystacks/types"
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material/';
import { useNavigate } from "react-router-dom";

export interface BookItemProps {
    book: Book
}  

export const BookItem = (props: BookItemProps) => {
    const { bookInfo } = props.book

    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate('/book-info', { state: { book: { ...props.book } } });
    }


    return (
        <StyledBox className='card' onClick={handleBookClick}>
            {bookInfo?.imgUrl &&
                <img
                    src={`${bookInfo.imgUrl}?w=164&h=164&fit=crop&auto=format`}
                    alt={bookInfo.title+"-img"}
                    loading="lazy"
                    style={{cursor: "pointer", width: "80px", height: "auto"}}
                />
            }
            
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

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "100px"
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