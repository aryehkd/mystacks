import React from 'react'
import { BookProgressStates, PageProps } from '@mystacks/types'
import { Box, styled, Typography, Grid, Tab, Tabs } from '@mui/material';
import { CustomAppBar } from '../components/app-bar/app-bar';
import { useHome } from '@mystacks/hooks';
import { BookItem } from '../elements/book/book';

/* eslint-disable-next-line */
export interface HomePageProps extends PageProps {

}

// TODO: this will require a lot of cleanup, for initial load, further loads, caching books etc
// TODO: make this logic in a hook

export const HomePage = (props: HomePageProps) => {
    const {
        currentShelfTab,
        savedBooks,
        loadedBooks,
        firstLoadComplete,
        handleTabChange,
        tabA11yProps
    } = useHome(props.appState)

  // TODO: fancy animation for scroll to tab, when tab is at bottom, scroll to top, add the stacks to green part of tabs bar

    return (
        <CustomAppBar logoSize='sm' appState={props.appState}>
            <BookInfoInnerContainer>
                <BookTitleContainer container>
                    <Box sx={{padding: "0 100px 0 0", minWidth: "400px"}}>
                        <Typography variant="h2" sx={{fontWeight: "600", color: "#000"}} id="typedtext"></Typography>
                    </Box>
                    <Box sx={{padding: "0 0 0 100px", "alignContent": "flex-end", minWidth: "500px"}}>
                        <Typography variant="h4" sx={{fontWeight: "500", color: "#000"}} id="typedtext2"></Typography>
                    </Box>
                </BookTitleContainer>
                <ReadingNowContainer container> 
                    <ReadingNowInnerContainer item xs={12} md={8}>
                        {loadedBooks.map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><BookItem book={book}/></Box>)}
                    </ReadingNowInnerContainer>
                </ReadingNowContainer>

                {firstLoadComplete && 
                <>
                    <QuickStatsContainer container>
                        
                    </QuickStatsContainer>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', background: "#6fbc31" }}>
                        <Tabs value={currentShelfTab} onChange={handleTabChange} aria-label="basic tabs example" indicatorColor="secondary"
          textColor="secondary"
>
                        <Tab label="to read" {...tabA11yProps(0)} sx={{color: "white", textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                        <Tab label="completed" {...tabA11yProps(1)} sx={{color: "white", textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                        <Tab label="recommended" {...tabA11yProps(2)} sx={{color: "white", textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={currentShelfTab} index={0}>
                        <ShelfContainer container> 
                            <ReadingNowInnerContainer item xs={12} md={8}>
                                {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.ToRead).map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><BookItem book={book}/></Box>)}
                            </ReadingNowInnerContainer>
                        </ShelfContainer>
                        </CustomTabPanel>
                        <CustomTabPanel value={currentShelfTab} index={1}>
                            <ShelfContainer container> 
                                <ReadingNowInnerContainer item xs={12} md={8}>
                                    {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.Completed).map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><BookItem book={book}/></Box>)}
                                </ReadingNowInnerContainer>                           
                            </ShelfContainer>
                        </CustomTabPanel>
                        <CustomTabPanel value={currentShelfTab} index={2}>
                            <ShelfContainer container> 
                                <ReadingNowInnerContainer item xs={12} md={8}>
                                    {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.Recommended).map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><BookItem book={book}/></Box>)}
                                </ReadingNowInnerContainer>                             
                            </ShelfContainer>
                    </CustomTabPanel>
                </>
                }
            </BookInfoInnerContainer>
        </CustomAppBar>
    )
}

export default HomePage;

const BookInfoInnerContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    margin: "55px 0"
}));

const BookTitleContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
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

const ShelfContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: "center",
    marginLeft: "40px",
    paddingTop: "30px"
})); 

const ReadingNowInnerContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignContent: "center",
    width: "100%"
})); 

const QuickStatsContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    width: "100%",
    alignItems: "center",
    margin: "55px 0 0 0",
    backgroundImage: "linear-gradient(#006300 50%, #4c991f 50%)",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",  
    marginTop: "60px",
    minHeight: "100px",
})); 

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }