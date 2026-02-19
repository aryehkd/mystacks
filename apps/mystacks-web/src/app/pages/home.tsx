import React, { useMemo, useEffect } from 'react'
import { BookProgressStates, PageProps, HomeLoadingStates, Book, ReadingGoal } from '@mystacks/types'
import { Box, styled, Typography, Grid, Tab, Tabs, Paper, useTheme } from '@mui/material';
import { CustomAppBar } from '../components/app-bar/app-bar';
import { useHome, useReadingGoals } from '@mystacks/hooks';
import { BookItem } from '../elements/book/book';
import { Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';
/* eslint-disable-next-line */
export interface HomePageProps extends PageProps {

}

function getGoalPeriodLabel(goal: ReadingGoal): string {
  if (goal.periodType === 'month' && goal.month != null) {
    return dayjs().month(goal.month - 1).format('MMMM YYYY');
  }
  if (goal.periodType === 'season' && goal.season != null) {
    const cap = goal.season.charAt(0).toUpperCase() + goal.season.slice(1);
    return `${cap} ${goal.year}`;
  }
  return String(goal.year);
}

function countCompletedInRange(books: Book[], start: number, end: number): number {
  return books.filter((b) => {
    const d = b?.userRating?.completedDate;
    if (d == null) return false;
    return d >= start && d <= end;
  }).length;
}

function HomeSemiCircleChart({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const theme = useTheme();
  const percent = max <= 0 ? 0 : Math.min(100, (value / max) * 100);
  const r = 50;
  const circumference = Math.PI * r;
  const dashLength = (percent / 100) * circumference;
  const trackColor = theme.palette.action.hover;
  const progressColor = theme.palette.primary.main;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          aspectRatio: '120 / 70',
          [theme.breakpoints.up('sm')]: { maxWidth: 320 },
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 120 70" style={{ overflow: 'visible', display: 'block' }} preserveAspectRatio="xMidYMax meet">
          <path d={`M 10 70 A ${r} ${r} 0 0 1 110 70`} fill="none" stroke={trackColor} strokeWidth={10} strokeLinecap="round" />
          {percent > 0 && (
            <path d={`M 10 70 A ${r} ${r} 0 0 1 110 70`} fill="none" stroke={progressColor} strokeWidth={10} strokeLinecap="round" strokeDasharray={`${dashLength} ${circumference}`} strokeDashoffset={0} />
          )}
        </svg>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 4,
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="700" color="text.primary">{value}/{max}</Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{label}</Typography>
    </Box>
  );
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

    const { goals, loadGoals, getGoalPeriodRange } = useReadingGoals(props.appState)
    useEffect(() => {
      loadGoals();
      // Intentionally run once on mount only; loadGoals updates app state and can change identity, which would retrigger this effect and cause an infinite request loop.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const completedBooks = useMemo(
      () => savedBooks.filter((b) => b?.userRating?.bookProgress === BookProgressStates.Completed),
      [savedBooks]
    )
    const now = dayjs().unix()
    const { currentGoals, goalProgress } = useMemo(() => {
      const current: ReadingGoal[] = []
      const progress: Record<string, number> = {}
      goals.forEach((g) => {
        const { start, end } = getGoalPeriodRange(g)
        progress[g.id] = countCompletedInRange(completedBooks, start, end)
        if (end >= now) current.push(g)
      })
      return { currentGoals: current, goalProgress: progress }
    }, [goals, completedBooks, now, getGoalPeriodRange])

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
                    {currentGoals.length > 0 && (loadingState === HomeLoadingStates.LoadComplete || loadingState === HomeLoadingStates.LoadingRegular) && (
                        <HomeGoalsSection>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                <Typography variant="subtitle1" fontWeight="600" color="text.secondary">
                                    Goals
                                </Typography>
                                <Link href="/insights" variant="body2" sx={{ fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>
                                    View all
                                </Link>
                            </Box>
                            <Box
                                sx={(t) => ({
                                    display: 'grid',
                                    gridTemplateColumns: '1fr',
                                    gap: 2,
                                    width: '100%',
                                    [t.breakpoints.up('sm')]: {
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                                    },
                                })}
                            >
                                {currentGoals.map((g) => (
                                    <Paper
                                        key={g.id}
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%',
                                            boxSizing: 'border-box',
                                        }}
                                    >
                                        <HomeSemiCircleChart
                                            value={goalProgress[g.id] ?? 0}
                                            max={g.target}
                                            label={getGoalPeriodLabel(g)}
                                        />
                                    </Paper>
                                ))}
                            </Box>
                        </HomeGoalsSection>
                    )}
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
                                <CompletedSectionInner item xs={12} md={12}>
                                    {savedBooks
                                        .filter(book => book?.userRating?.bookProgress == BookProgressStates.Completed)
                                        .sort((a, b) => (b.userRating?.completedDate ?? 0) - (a.userRating?.completedDate ?? 0))
                                        .slice(0, 10)
                                        .map((book, index) => (
                                            <BookWrapper key={index}>
                                                <BookItem book={book} />
                                            </BookWrapper>
                                        ))}
                                    {!!savedBooks.length && (
                                        <ViewAllWrapper>
                                            <Link href="/shelf" variant="body1" display="flex" alignItems="center" justifyContent="center" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
                                                View all
                                                <ArrowForwardIcon sx={{ marginLeft: 1 }} />
                                            </Link>
                                        </ViewAllWrapper>
                                    )}
                                </CompletedSectionInner>
                            </ShelfContainer>
                        </CustomTabPanel>
                    <CustomTabPanel value={currentShelfTab} index={1}>
                        <ShelfContainer container> 
                            <CompletedSectionInner item xs={12} md={12}>
                                {savedBooks
                                    .filter(book => book?.userRating?.bookProgress == BookProgressStates.ToRead)
                                    .map((book, index) => (
                                        <BookWrapper key={book.id ?? index}>
                                            <BookItem book={book} />
                                        </BookWrapper>
                                    ))}
                                {!!savedBooks.length && (
                                    <ViewAllWrapper>
                                        <Link href="/shelf" variant="body1" display="flex" alignItems="center" justifyContent="center" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
                                            Go to my shelf
                                            <ArrowForwardIcon sx={{ marginLeft: 1 }} />
                                        </Link>
                                    </ViewAllWrapper>
                                )}
                            </CompletedSectionInner>
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
    marginLeft: 0,
    paddingTop: "30px",

    [theme.breakpoints.up("md")]: {
        marginLeft: "40px",
    },
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

const HomeGoalsSection = styled(Box)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    boxSizing: 'border-box',
    [theme.breakpoints.up('md')]: {
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 0,
        paddingRight: 0,
    },
}));

const ReadingNowSubtitleContainer = styled(Box)(({ theme }) => ({
    paddingLeft: "40px",
    [theme.breakpoints.up("md")]: {
        padding: "0 0 0 100px", 
        alignContent: "flex-end", 
        minWidth: "500px"
    }
})); 

const CAROUSEL_ITEM_WIDTH = 120;
const CAROUSEL_GAP = 16;

const CompletedSectionInner = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
    marginLeft: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    gap: CAROUSEL_GAP,
    alignItems: 'flex-start',

    '& .card': {
        width: '100%',
        minWidth: 0,
        maxWidth: `${CAROUSEL_ITEM_WIDTH}px`,
    },
    '& img': {
        width: '100% !important',
        maxWidth: '100% !important',
        height: 'auto',
        objectFit: 'cover',
        display: 'block',
    },
    '& .card-text': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    },

    [theme.breakpoints.up("md")]: {
        flexWrap: 'wrap',
        overflowX: 'visible',
        overflowY: 'visible',
        WebkitOverflowScrolling: 'auto',
        scrollbarWidth: 'auto',
        '&::-webkit-scrollbar': { display: 'block' },
        justifyContent: 'flex-start',
        alignContent: 'center',
        width: '100%',
        marginLeft: '40px',
        paddingLeft: 0,
        paddingRight: 0,
        gap: 0,
    },
}));

const ViewAllWrapper = styled(Box)(({ theme }) => ({
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: CAROUSEL_ITEM_WIDTH,
    minWidth: CAROUSEL_ITEM_WIDTH,
    marginLeft: 0,

    [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(6),
        minWidth: 'auto',
        width: 'auto',
    },
}));

const BookWrapper = styled(Grid)(({ theme }) => ({
    flexShrink: 0,
    width: CAROUSEL_ITEM_WIDTH,
    minWidth: CAROUSEL_ITEM_WIDTH,
    margin: 0,
    boxSizing: 'border-box',

    [theme.breakpoints.up("md")]: {
        width: 'auto',
        minWidth: 'auto',
        margin: "0 50px",
    },
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