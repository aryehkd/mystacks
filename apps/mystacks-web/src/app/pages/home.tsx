import React from 'react'
import { BookProgressStates, PageProps, HomeLoadingStates } from '@mystacks/types'
import { Box, styled, Typography, Grid, Tab, Tabs } from '@mui/material';
import { CustomAppBar } from '../components/app-bar/app-bar';
import { useHome } from '@mystacks/hooks';
import { BookItem } from '../elements/book/book';
import { Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
        loadingState,
        handleTabChange,
        tabA11yProps,
        getBooksReadThisYear
    } = useHome(props.appState)

  // TODO: fancy animation for scroll to tab, when tab is at bottom, scroll to top, add the stacks to green part of tabs bar
   
    return (
        <CustomAppBar logoSize='sm' appState={props.appState} hideFooter={loadingState !== HomeLoadingStates.LoadComplete && loadingState !== HomeLoadingStates.LoadingRegular}>
            <BookInfoInnerContainer>
                <HomeSectionContainer>
                    <ReadingNowOuterContainer>
                        <BookTitleContainer container>
                            <BookTitleInnerContainer >
                                <Typography variant="h2" sx={{fontWeight: "600", color: "#000"}} id="typedtext"></Typography>
                            </BookTitleInnerContainer>
                            <ReadingNowSubtitleContainer>
                                <Typography variant="h4" sx={{fontWeight: "500", color: "#000"}} id="typedtext2"></Typography>
                            </ReadingNowSubtitleContainer>
                        </BookTitleContainer>
                        <ReadingNowContainer container> 
                            <ReadingNowInnerContainer item xs={12} md={8}>
                                {loadedBooks.map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><BookItem book={book}/></Box>)}
                            </ReadingNowInnerContainer>
                        </ReadingNowContainer>
                    </ReadingNowOuterContainer>
                    {(loadingState == HomeLoadingStates.LoadComplete || loadingState == HomeLoadingStates.LoadingRegular) && 
                        <StatOuterContainer>
                                <Box sx={{padding: "0"}}>
                                    <Typography variant="h5" sx={{fontWeight: "600", color: "#000"}}>You've completed</Typography>
                                </Box>
                                <Box sx={{padding: "0"}} display="flex" flexDirection="row">
                                        <Typography variant="h1" sx={{fontWeight: "600", color: "#AF5784"}}>{getBooksReadThisYear()}</Typography>
                                </Box>
                                <Box sx={{padding: "0"}}>
                                    <Typography variant="h5" sx={{fontWeight: "600", color: "#000"}}>books this year</Typography>
                                </Box>
                        </StatOuterContainer>
                    }
                </HomeSectionContainer>

                {(loadingState == HomeLoadingStates.LoadComplete || loadingState == HomeLoadingStates.LoadingRegular) && 
                <>
                    <QuickStatsContainer container>
                        
                    </QuickStatsContainer>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', background: "#6fbc31" }}>
                        <Tabs value={currentShelfTab} onChange={handleTabChange} aria-label="basic tabs example" indicatorColor="secondary"
                            textColor="secondary"
                        >
                            <Tab label="completed recently" {...tabA11yProps(1)} sx={{color: "white", textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                            <Tab label="up next" {...tabA11yProps(0)} sx={{color: "white", textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={currentShelfTab} index={0}>
                            <ShelfContainer container> 
                                <ShelfInnerContainer item xs={12} md={12}>
                                    {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.Completed).sort((a,b) => (b.userRating?.completedDate??0) - (a.userRating?.completedDate??0)).splice(0,5).map((book, index) => <BookWrapper key={index}><BookItem book={book}/></BookWrapper>)}
                                    {!!savedBooks.length && 
                                        <BookWrapper  >
                                            <Link href="/shelf" variant="body1" display="flex" alignItems="center">
                                                Go to my shelf
                                                <ArrowForwardIcon style={{ marginLeft: 8 }} />
                                            </Link>
                                        </BookWrapper>                     
                                   }
                                </ShelfInnerContainer>                           
                            </ShelfContainer>
                        </CustomTabPanel>
                    <CustomTabPanel value={currentShelfTab} index={1}>
                        <ShelfContainer container> 
                            <ShelfInnerContainer item xs={12} md={12}>
                                {!!savedBooks.length && 
                                    <BookWrapper  >
                                        <Link href="/shelf" variant="body1" display="flex" alignItems="center">
                                            Go to my shelf
                                            <ArrowForwardIcon style={{ marginLeft: 8 }} />
                                        </Link>
                                    </BookWrapper>                     
                                }
                            </ShelfInnerContainer>
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
    margin: "55px 0",
    minHeight: "60vh",
}));

const BookTitleContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',

    [theme.breakpoints.up("md")]: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));


const HomeSectionContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up("md")]: {
        flexDirection: 'row',
    }
}));

const BookTitleInnerContainer = styled(Grid)(({ theme }) => ({
    padding: "0 0 0 0",
    [theme.breakpoints.up("md")]: {
        padding: "0 100px 0 0", 
        minWidth: "400px",
    }
    
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

const ReadingNowOuterContainer = styled(Grid)(({ theme }) => ({
    width: "100%",

    [theme.breakpoints.up("md")]: {
        width: "66.6%",

    }
})); 

const StatOuterContainer = styled(Grid)(({ theme }) => ({
    width: "100%",
    marginTop: "40px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",

    [theme.breakpoints.up("md")]: {
        margin: 0,
        width: "25%",
    }
})); 

const ReadingNowSubtitleContainer = styled(Box)(({ theme }) => ({
    paddingLeft: "40px",
    [theme.breakpoints.up("md")]: {
        padding: "0 0 0 100px", 
        alignContent: "flex-end", 
        minWidth: "500px"
    }
})); 

const ShelfInnerContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

    [theme.breakpoints.up("md")]: {
        justifyContent: 'flex-start',
        alignContent: "center",
        width: "100%"
    }
})); 

const BookWrapper = styled(Grid)(({ theme }) => ({
    margin: "20px 20px",

    [theme.breakpoints.up("md")]: {
        margin: "0 50px"
    }
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