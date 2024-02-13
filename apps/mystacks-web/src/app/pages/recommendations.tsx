import React from 'react'
import { Book, PageProps } from '@mystacks/types'
import { CustomAppBar } from '../components/app-bar/app-bar';
import { Box, styled, FormControl, FormLabel, Grid, FormControlLabel, Checkbox, Typography, FormGroup, Button } from '@mui/material';
import { useAIRecommendations } from '@mystacks/book-search-form';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { RecommendationItem } from '../elements/book/book';

/* eslint-disable-next-line */
export interface RecommendationsPageProps extends PageProps {

}

// TODO: move this logic to hook and clean up

export const RecommendationsPage = (props: RecommendationsPageProps) => {
    const {
        savedBooks,
        inputBooks,
        recommendedBooks,
        loadAIRecommendationsTerms,
        setInputBooks
    } = useAIRecommendations(props.appState)


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const affectedBook = savedBooks.find(book => book.id == event.target.name)
        if (event.target.checked && affectedBook) {
            setInputBooks([...inputBooks, affectedBook])
        } else {
            setInputBooks(inputBooks.filter(inputBook => inputBook.id != event.target.name))
        }
    }


    return (
        <CustomAppBar logoSize='sm' appState={props.appState}>
            <RecommendationsInnerContainer>
                <TitleContainer id="1">
                    <Box sx={{padding: "0 500px 0 0", minWidth: "400px", display: "flex", justifyContent: "center"}}>
                        <Typography variant="h3" sx={{fontWeight: "600", color: "#000"}} id="typedtext">AI Recommendations</Typography>
                    </Box>
                    <Box sx={{padding: "0 0 0 100px", "alignContent": "flex-end", minWidth: "500px", display: "flex", justifyContent: "center"}}>
                        <Typography variant="h5" sx={{fontWeight: "500", color: "#000"}} id="typedtext2">Select the books you would like to use as input for the AI recommendations</Typography>
                    </Box>
                </TitleContainer>
                <OptionsContainer container>
                    <Grid item xs={10}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Select Input Books</FormLabel>
                        <StyledFormGroup>
                            {savedBooks.map((book: Book) => 
                                <Box sx={{width: "250px"}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={!!inputBooks.filter(inputBook => inputBook.id == book.id).length} onChange={handleChange} name={book.id} />
                                        }
                                        label={book.bookInfo.title}
                                    />
                                </Box>
                            )}
                        </StyledFormGroup>
                    </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Button 
                            variant="outlined"
                            startIcon={<AutoAwesomeIcon />}
                            onClick={() => loadAIRecommendationsTerms(inputBooks)}
                        >
                            Generate
                        </Button>
                    </Grid>
                </OptionsContainer>
                <ReadingNowContainer container> 
                    <ReadingNowInnerContainer item xs={12} md={8}>
                        {recommendedBooks.map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><RecommendationItem book={book}/></Box>)}
                    </ReadingNowInnerContainer>
                </ReadingNowContainer>
            </RecommendationsInnerContainer>
        </CustomAppBar>
    )
}

export default RecommendationsPage;

const RecommendationsInnerContainer = styled(Box)(({ theme }) => ({
    margin: "20px 0 0 0",

    [theme.breakpoints.up("md")]: {
        margin: "50px 20px",
    },
}));

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "20px",
}));

const TitleContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
}));

const OptionsContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ReadingNowContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: "center",
    marginTop: "40px",
})); 

const ReadingNowInnerContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: "center",
    width: "100%"
})); 