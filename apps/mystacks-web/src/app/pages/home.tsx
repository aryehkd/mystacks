import React from 'react'
import { Book, BookProgressStates, PageProps } from '@mystacks/types'
import { Box, styled, Button, Typography, Grid } from '@mui/material';
import { CustomAppBar } from '../components/app-bar/app-bar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { useSavedBooks } from '@mystacks/saved-books';
import { HomepageAccordion } from '../components/homepage-accordion';
import { BookItem } from '../elements/book/book';

/* eslint-disable-next-line */
export interface HomePageProps extends PageProps {

}

// TODO: this will require a lot of cleanup, for initial load, further loads, caching books etc

export const HomePage = (props: HomePageProps) => {
    const navigate = useNavigate();
    const [ ready, setReady ] = React.useState(false)
    const [ loadedBooks, setLoadedBooks ] = React.useState<Book[]>([])

    const handleSearchClick = () => {
        navigate('/search');
    }

    const { savedBooks, loadSavedBooks } = useSavedBooks(props.appState)

    React.useEffect(() => {
        console.log('hi')
        typewriter()
        loadSavedBooks()
    }, [])

    let added = 0
    const addBooks = () => {
        const currentlyReading = savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading)

        console.log('addBooks', currentlyReading, added, currentlyReading.length)
        if (currentlyReading.length > added) {
            setLoadedBooks(currentlyReading.slice(0, added + 1))
            added += 1

            setTimeout(() => addBooks(), 1000);
        }
    }

    React.useEffect(() => {
        if (savedBooks.length && ready == true && loadedBooks.length == 0) {
            console.log('GO', savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading))
            setTimeout(() => addBooks(), 1000);
        }
    }, [savedBooks, ready])

    const today = new Date();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const typewriter = () => {
        const pt1 = "it's February..."
        const pt2 = "and this is what you're reading"

        let index1 = 1
        let index2 = 1

        const destination = document.getElementById("typedtext");
        const destination2 = document.getElementById("typedtext2");
        if (!destination || !destination2) return;

        destination.innerHTML = ''
        destination2.innerHTML = ''
        
        const write = () => {
            if (index1 <= pt1.length) {
                destination.innerHTML = pt1.substring(0, index1)
                index1 += 1
                if (index1 > pt1.length) setTimeout(() => write(), 1000)
                else setTimeout(() => write(), 100);
            } else if (index2 <= pt2.length) {
                destination2.innerHTML = pt2.substring(0, index2)
                index2 += 1
                setTimeout(() => write(), 40);
            } else {
                setReady(true)
            }     
        }

        console.log('WRITE start', destination)
        setTimeout(() => write(), 100);

    }
    return (
        <CustomAppBar logoSize='sm'>
            <BookInfoInnerContainer>
                <BookTitleContainer container>
                    <BookTitleInnerContainer item xs={12} md={6}>
                        <Typography variant="h2" sx={{fontWeight: "600", color: "#000"}} id="typedtext"></Typography>
                    </BookTitleInnerContainer>
                    <BookTitleInnerContainer item xs={12} md={6} sx={{padding: "0 0 0 100px"}}>
                        <Typography variant="h4" sx={{fontWeight: "500", color: "#000"}} id="typedtext2"></Typography>
                    </BookTitleInnerContainer>
                </BookTitleContainer>
                <ReadingNowContainer container> 
                        {loadedBooks.map((book, index) => <ReadingNowInnerContainer item xs={6} md={2} key={index}><BookItem book={book}/></ReadingNowInnerContainer>)}
                </ReadingNowContainer>

                
                {/* <Button onClick={handleSearchClick} variant="text" sx={{textTransform: "none", color: "#000"}} startIcon={<AddCircleIcon />}>
                    Search For Books!
                </Button>
                <HomepageAccordion books={savedBooks} /> */}
            </BookInfoInnerContainer>
        </CustomAppBar>
    )
}

export default HomePage;

const BookInfoInnerContainer = styled(Box)(({ theme }) => ({
    width: "80%",
    margin: "40px 0 0 0"
}));

const BookTitleContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const BookTitleInnerContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    width: "100%"
}));

const ReadingNowContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: "40px",
})); 

const ReadingNowInnerContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    width: "100%"
})); 