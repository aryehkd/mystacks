import React from 'react'
import { Grid, styled, Typography, Rating, ToggleButtonGroup, ToggleButton, TextField, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { PrimaryButton, DeleteButton } from '../../elements/button/button'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircularProgress from '@mui/material/CircularProgress';

import { Book, BookProgressStates, BookProgressState, BookRating } from '@mystacks/types'
import ISBNField from '../../elements/isbn-field/isbn-field';
import CustomDatePicker from '../../elements/date-picker/date-picker';
import { Dayjs } from 'dayjs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CoverImage from '../../elements/cover-image/CoverImage'


export interface BookInfoProps {
    book: Book
    bookProgress: BookProgressState
    rating: BookRating
    notes: string
    isbn: string
    isbnError: string | undefined
    loading: boolean
    completedDate: Dayjs | null
    handleBookProgressChange: (newBookProgressState: BookProgressState) => void
    handleBookRatingChange: (newBookRating: BookRating) => void
    handleNotesChange: (newNotes: string) => void
    handleISBNChange: (newISBN: string) => void
    handleCompletedDateChange: (newDate: Dayjs | null) => void
    saveBook: () => void
}

export const BookInfo = (props: BookInfoProps) => {
    const { 
        book,
        bookProgress, 
        rating, 
        notes, 
        isbn, 
        isbnError, 
        loading, 
        completedDate,
        handleBookProgressChange, 
        handleBookRatingChange, 
        handleNotesChange, 
        handleISBNChange,
        handleCompletedDateChange,
        saveBook, 
    } = props

    // TODO: make img component and reuse 
    return (
        <BookInfoContainer container spacing={2}>
            <Grid item xs={5} md={2}>
                <CoverImage imgUrl={book.bookInfo.imgUrl} alt={book.bookInfo.title}/>
            </Grid>
            <Grid item xs={7} md={4}>
                <Typography variant='h4'>{book.bookInfo.title}</Typography>
                <Typography variant='h6'>{book.bookInfo.author}</Typography>
                <ISBNField isbn={isbn} handleISBNChange={handleISBNChange} isbnError={isbnError} />
                <AccordionContainer>
                    <Accordion elevation={0}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        More info
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant='body2'>{book.bookInfo.pageCount} pages</Typography>
                            <Typography variant='body2'>Published by {book.bookInfo.publisher}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </AccordionContainer>
            </Grid>
            <Grid item xs={12} md={4}>
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
                            sx={{width: "100%"}}
                            orientation={"vertical"}
                        >
                            <CustomButton value={BookProgressStates.ToRead}>To Read</CustomButton>
                            <CustomButton value={BookProgressStates.CurrentlyReading}>Currently Reading</CustomButton>
                            <CustomButton value={BookProgressStates.Recommended}>Recommended</CustomButton>
                            <CustomButton value={BookProgressStates.Completed}>Completed</CustomButton>
                        </ToggleButtonGroup>
                    </CategoryContainer>
                    {bookProgress === BookProgressStates.Completed &&
                        <Grid item xs={12} sx={{marginTop: "20px"}}>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <CustomDatePicker value={completedDate} handleDateChange={handleCompletedDateChange} label={"Completed Date"}/> 
                                </Grid>
                                <RatingContainer item xs={12} sm={6}>
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
                            </Grid>
                        </Grid>
                    }
                    <Grid item xs={12} sx={{margin: "20px 0"}}>
                        <StyledNotesField
                            label="Notes"
                            multiline
                            fullWidth
                            rows={4}
                            value={notes}
                            onChange={(event) => {handleNotesChange(event.target.value);}}
                            color='secondary'
                        />
                    </Grid>
                    <CategoryContainer item xs={12}>
                        {loading ? 
                            <CircularProgress  color="secondary"/>
                        :
                            <PrimaryButton onClick={saveBook}>Save</PrimaryButton>
                        }
                        <Box sx={{marginLeft: "10px"}}><DeleteButton onClick={() => console.log('')}>Cancel</DeleteButton></Box>
                    </CategoryContainer>
                </Grid>
            </Grid>

        </BookInfoContainer>
    )
}


const BookInfoContainer = styled(Grid)(({ theme }) => ({
    margin: "0",
    width: "95%",
    justifyContent: "center",
    // border: "4px solid #000",
    [theme.breakpoints.up("md")]: {
        width: "100%",
        padding: "0 40px",
    },
}));

const CategoryContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
}));

const RatingContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: "20px",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
        marginTop: "0",
        justifyContent: "flex-end",
    },
}));

const AccordionContainer = styled(Box)(({ theme }) => ({
    margin: "20px 0",

    "& #panel1-header": {
        padding: "0"
    },

    "& .MuiAccordionDetails-root": {
        padding: "0"
    }
}));

const CustomButton = styled(ToggleButton)(({ theme }) => ({
    textTransform: "none",
    borderWidth: "3px",
    borderColor: "#808080",
}));

const StyledRating = styled(Rating)({
    paddingTop: "5px",
    fontSize: "40px",
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
});

const StyledNotesField = styled(TextField)(({ theme }) => ({
    '& fieldset': {
        borderColor: '#808080',
        borderWidth: 3,
    },
    '& .MuiFormControl-root': {
        color: "#808080"
    }

}));