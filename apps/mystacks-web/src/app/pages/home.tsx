import React from 'react'
import { PageProps } from '@mystacks/types'
import { Box, styled, Button } from '@mui/material';
import { CustomAppBar } from '../components/app-bar/app-bar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { useSavedBooks } from '@mystacks/saved-books';
import { HomepageAccordion } from '../components/homepage-accordion';

/* eslint-disable-next-line */
export interface HomePageProps extends PageProps {

}

export const HomePage = (props: HomePageProps) => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    }

    const { savedBooks, loadSavedBooks } = useSavedBooks(props.appState)

    React.useEffect(() => {
        console.log('hi')
        loadSavedBooks()
    }, [])

    return (
        <CustomAppBar logoSize='sm'>
            <BookInfoInnerContainer>
                <Button onClick={handleSearchClick} variant="text" sx={{textTransform: "none", color: "#000"}} startIcon={<AddCircleIcon />}>
                    Search For Books!
                </Button>
                <HomepageAccordion books={savedBooks} />
            </BookInfoInnerContainer>
        </CustomAppBar>
    )
}

export default HomePage;

const BookInfoInnerContainer = styled(Box)(({ theme }) => ({
    width: "80%",
    margin: "50px 0 0 0"
}));