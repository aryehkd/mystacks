import React from 'react';
import { Box, styled, Link, Grid, Tab, Tabs } from '@mui/material';
import { useSavedBooks } from '@mystacks/hooks';
import { BookProgressStates, PageProps, HomeLoadingStates } from '@mystacks/types'
import { BookItem } from '../elements/book/book';
import { CustomAppBar } from '../components/app-bar/app-bar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface ShelfPageProps extends PageProps {

}

export const Shelf = (props: ShelfPageProps) => {
    const { savedBooks, loadSavedBooks } = useSavedBooks(props.appState)
    const [  currentShelfTab, setCurrentShelfTab ] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentShelfTab(newValue);
    };

    React.useEffect(() => {
        loadSavedBooks()
    }, [])

    return (
        <CustomAppBar logoSize='sm' appState={props.appState} >
            <Box display={"flex"} flexDirection={"column"} width={"100%"} style={{minHeight: "70vh"}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', background: "#fff" }}>
                        <Tabs value={currentShelfTab} onChange={handleTabChange} aria-label="basic tabs example" indicatorColor="secondary"
                            textColor="primary"
                        >
                            <Tab label="completed" {...tabA11yProps(0)} sx={{textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                            <Tab label="up next" {...tabA11yProps(1)} sx={{textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                            <Tab label="currently reading" {...tabA11yProps(2)} sx={{ textTransform: "none", fontWeight: "600", fontSize: "16px"}}/>
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={currentShelfTab} index={0}>
                            <ShelfContainer container> 
                                <ShelfInnerContainer item xs={12} md={12}>
                                    {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.Completed).sort((a,b) => (b.userRating?.completedDate??0) - (a.userRating?.completedDate??0)).map((book, index) => <Box sx={{margin: "10px  50px"}} key={index}><BookItem book={book}/></Box>)}
                     
                                </ShelfInnerContainer>                           
                            </ShelfContainer>
                    </CustomTabPanel>
                    <CustomTabPanel value={currentShelfTab} index={1}>
                        <ShelfContainer container> 
                            <ShelfInnerContainer item xs={12} md={12}>
                                {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.ToRead).map((book, index) => <Box sx={{margin: "10px 50px"}} key={index}><BookItem book={book}/></Box>)}

                            </ShelfInnerContainer>
                        </ShelfContainer>
                    </CustomTabPanel>
                    <CustomTabPanel value={currentShelfTab} index={2}>
                        <ShelfContainer container> 
                            <ShelfInnerContainer item xs={12} md={12}>
                                {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading).map((book, index) => <Box sx={{margin: "10px  50px"}} key={index}><BookItem book={book}/></Box>)}

                            </ShelfInnerContainer>
                        </ShelfContainer>
                    </CustomTabPanel>

            {/* <Grid container spacing={2} wrap="wrap" style={{margin: "40px 0"}}>
                {savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.ToRead).map((book, index) => (
                    <Box sx={{margin: "0 50px"}} key={index}>
                        <BookItem book={book}/>
                    </Box>
                ))}
            </Grid> */}
            </Box>
        </CustomAppBar>
    );
}

export default Shelf;

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

const tabA11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ShelfInnerContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: "center",
    width: "100%",
    flexWrap: "wrap"
})); 

const ShelfContainer = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: "center",
    marginLeft: "40px",
    paddingTop: "30px"
})); 