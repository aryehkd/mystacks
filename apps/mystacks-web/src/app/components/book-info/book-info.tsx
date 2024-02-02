import React from 'react'
import { Grid, styled, Typography, Rating, ToggleButtonGroup, ToggleButton, Button } from '@mui/material'
import { PrimaryButton } from '../../elements/button/button'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Book, BookProgressStates, BookProgressState, BookRating } from '@mystacks/types'


export interface BookInfoProps {
    book: Book
    bookProgress: BookProgressState
    rating: BookRating
    handleBookProgressChange: (newBookProgressState: BookProgressState) => void
    handleBookRatingChange: (newBookRating: BookRating) => void
    saveBook: () => void
}

export const BookInfo = (props: BookInfoProps) => {
    const { book, bookProgress, rating, handleBookProgressChange, handleBookRatingChange, saveBook } = props

    // TODO: make img component and reuse 
    return (
        <BookInfoContainer container spacing={2}>
            <Grid item xs={4}>
                {book.imgUrl &&
                    <img
                        src={`${book.imgUrl}?w=164&h=164&fit=crop&auto=format`}
                        alt={book.title+"-img"}
                        loading="lazy"
                        style={{cursor: "pointer", width: "100px", height: "auto"}}
                    />
                }
            </Grid>
            <Grid item xs={8}>
                <Typography variant='subtitle1'>{book.title}</Typography>
                <Typography variant='subtitle2'>{book.author}</Typography>
                <div style={{marginTop: "20px"}}>more info to be added here</div>
            </Grid>
            <Grid item xs={12}  sx={{margin: "20px 0"}}>
                <Grid container>
                    <Grid item xs={6}>
                        <ToggleButtonGroup
                            id="book-info-category"
                            color="secondary"
                            value={bookProgress}
                            exclusive
                            onChange={(
                                event: React.MouseEvent<HTMLElement>,
                                newValue: string,
                              ) => handleBookProgressChange(newValue as BookProgressState)}
                            aria-label="Platform"
                        >
                            <CustomButton value={BookProgressStates.ToRead}>To Read</CustomButton>
                            <CustomButton value={BookProgressStates.CurrentlyReading}>Currently Reading</CustomButton>
                            <CustomButton value={BookProgressStates.Recommended}>Recommended</CustomButton>
                            <CustomButton value={BookProgressStates.Completed}>Completed</CustomButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <RatingContainer item xs={6}>
                        <Typography variant='subtitle1'>My Rating</Typography>
                        <StyledRating
                            name="customized-color"
                            value={rating}
                            onChange={(event, newValue) => {
                                handleBookRatingChange(newValue as BookRating);
                            }}
                            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                    </RatingContainer>
                    <Grid item xs={12} sx={{margin: "20px 0"}}>
                        <PrimaryButton onClick={saveBook}>Save</PrimaryButton>
                    </Grid>
                </Grid>
            </Grid>

        </BookInfoContainer>
    )
}


const BookInfoContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
}));

const RatingContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
}));

const CustomButton = styled(ToggleButton)(({ theme }) => ({
    textTransform: "none"
}));

const StyledRating = styled(Rating)({
    marginLeft: "15px",

    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
});