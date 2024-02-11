import React from 'react'
import { Book, BookProgressStates, PageProps } from '@mystacks/types'
import { Box, styled, Typography, Grid, Tab, Tabs } from '@mui/material';
import { CustomAppBar } from '../components/app-bar/app-bar';
import { useSavedBooks } from '@mystacks/saved-books';
import { BookItem } from '../elements/book/book';

/* eslint-disable-next-line */
export interface HomePageProps extends PageProps {

}

// TODO: this will require a lot of cleanup, for initial load, further loads, caching books etc

export const HomePage = (props: HomePageProps) => {
    const [ ready, setReady ] = React.useState(false)
    const [ loadedBooks, setLoadedBooks ] = React.useState<Book[]>([])
    const [progress, setProgress] = React.useState(24);


    // TODO: these need to be reading session storage once books get saved between loads
    const [ firstLoad, setFirstLoad ] = React.useState(true)
    const [ firstLoadComplete, setFirstLoadComplete ] = React.useState(false)


    const { savedBooks, loadSavedBooks } = useSavedBooks(props.appState)

    React.useEffect(() => {        
        firstLoad && typewriter()
        setFirstLoad(false)

        loadSavedBooks()
    }, [])

    React.useEffect(() => {
        if (savedBooks.length && ready == true && loadedBooks.length == 0) {
            setTimeout(() => addBooks(), 1000);
        }
    }, [savedBooks, ready])



    const addBooks = () => {
        let added = 0

        const addBook = () => {
            const currentlyReading = savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading)

            if (currentlyReading.length > added) {
                setLoadedBooks(currentlyReading.slice(0, added + 1))
                added += 1
    
                setTimeout(() => addBook(), 1000);
            }
            else {
                setFirstLoadComplete(true)
                window.sessionStorage.setItem('firstLoadComplete', 'true')
            }
        }

        addBook()
    }

    const today = new Date();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const typewriter = () => {
        const pt1 = `it's ${month[today.getMonth()]}...`
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

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

      const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // TODO: center text and books for first section

  // TODO: fancy animation for scroll to tab, when tab is at bottom, scroll to top, add the stacks to green part of tabs bar

    return (
        <CustomAppBar logoSize='sm'>
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
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="secondary"
          textColor="secondary"
>
                        <Tab label="to read" {...a11yProps(0)} sx={{color: "white", textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                        <Tab label="completed" {...a11yProps(1)} sx={{color: "white", textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                        <Tab label="recommended" {...a11yProps(2)} sx={{color: "white", textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <ShelfContainer container> 
                            <ReadingNowInnerContainer item xs={12} md={8}>
                                {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.ToRead).map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><BookItem book={book}/></Box>)}
                            </ReadingNowInnerContainer>
                        </ShelfContainer>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <ShelfContainer container> 
                                <ReadingNowInnerContainer item xs={12} md={8}>
                                    {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.Completed).map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><BookItem book={book}/></Box>)}
                                </ReadingNowInnerContainer>                           
                            </ShelfContainer>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <ShelfContainer container> 
                                <ReadingNowInnerContainer item xs={12} md={8}>
                                    {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.Recommended).map((book, index) => <Box sx={{margin: "0 50px"}} key={index}><BookItem book={book}/></Box>)}
                                </ReadingNowInnerContainer>                             
                            </ShelfContainer>
                    </CustomTabPanel>
                </>
                }
                
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
    width: "100%",
    margin: "55px 0"
}));

const BookTitleContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

const QuickStatsInnerContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    width: "100%"
})); 