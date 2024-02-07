import React from 'react'
import { Grid, styled, Typography, Rating, ToggleButtonGroup, ToggleButton, TextField } from '@mui/material'
import { PrimaryButton } from '../../elements/button/button'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircularProgress from '@mui/material/CircularProgress';

import { Book, BookProgressStates, BookProgressState, BookRating } from '@mystacks/types'
import ISBNField from '../../elements/isbn-field/isbn-field';


export interface BookInfoProps {
    book: Book
    bookProgress: BookProgressState
    rating: BookRating
    notes: string
    isbn: string
    isbnError: string | undefined
    loading: boolean
    handleBookProgressChange: (newBookProgressState: BookProgressState) => void
    handleBookRatingChange: (newBookRating: BookRating) => void
    handleNotesChange: (newNotes: string) => void
    handleISBNChange: (newISBN: string) => void
    saveBook: () => void
}

export const BookInfo = (props: BookInfoProps) => {
    const { book, bookProgress, rating, notes, isbn, isbnError, loading, handleBookProgressChange, handleBookRatingChange, handleNotesChange, saveBook, handleISBNChange } = props

    // TODO: make img component and reuse 
    return (
        <BookInfoContainer container spacing={2}>
            <Grid item xs={2}>
                {book.bookInfo.imgUrl &&
                    <img
                        src={`${book.bookInfo.imgUrl}?w=164&h=164&fit=crop&auto=format`}
                        alt={book.bookInfo.title+"-img"}
                        loading="lazy"
                        style={{cursor: "pointer", height: "auto"}}
                    />
                }
            </Grid>
            <Grid item xs={5}>
                <Typography variant='subtitle1'>{book.bookInfo.title}</Typography>
                <Typography variant='subtitle2'>{book.bookInfo.author}</Typography>
                <ISBNField isbn={isbn} handleISBNChange={handleISBNChange} isbnError={isbnError} />
            </Grid>
            <Grid item xs={5}>
                <Grid container>
                    <CategoryContainer item xs={12}>
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
                    </CategoryContainer>
                    {bookProgress === BookProgressStates.Completed &&
                        <RatingContainer item xs={12}>
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
                    }
                    <Grid item xs={12} sx={{margin: "20px 0"}}>
                        <TextField
                            label="Notes"
                            multiline
                            fullWidth
                            rows={4}
                            value={notes}
                            onChange={(event) => {handleNotesChange(event.target.value);}}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{margin: "20px 0"}}>
                        {loading ? 
                            <CircularProgress  color="secondary"/>
                        :
                            <PrimaryButton onClick={saveBook}>Save</PrimaryButton>
                        }
                    </Grid>
                </Grid>
            </Grid>

        </BookInfoContainer>
    )
}


const BookInfoContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
}));

const CategoryContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
}));

const RatingContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "20px"
}));

const CustomButton = styled(ToggleButton)(({ theme }) => ({
    textTransform: "none"
}));

const StyledRating = styled(Rating)({

    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
});