import React from 'react'
import { Grid, styled, Typography, Rating, ToggleButtonGroup, ToggleButton, Button } from '@mui/material'
import { PrimaryButton } from '../../elements/button/button'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Book } from '@mystacks/types'


export interface BookInfoProps {
    book: Book
}

export const BookInfo = (props: BookInfoProps) => {
    const { book } = props
    const [alignment, setAlignment] = React.useState('to-read');

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment);
    };

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
                            color="secondary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <CustomButton value="to-read">To Read</CustomButton>
                            <CustomButton value="currently-reading">Currently Reading</CustomButton>
                            <CustomButton value="recommended">Recommended</CustomButton>
                            <CustomButton value="completed">Completed</CustomButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <RatingContainer item xs={6}>
                        <Typography variant='subtitle1'>My Rating</Typography>
                        <StyledRating
                            name="customized-color"
                            defaultValue={0}
                            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                    </RatingContainer>
                    <Grid item xs={12} sx={{margin: "20px 0"}}>
                        <PrimaryButton onClick={() => console.log('')}>Save</PrimaryButton>
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