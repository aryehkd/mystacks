import React, { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageProps,
  Book,
  BookProgressStates,
  ReadingGoal,
  ReadingGoalPeriodType,
  ReadingGoalSeason,
} from '@mystacks/types';
import { CustomAppBar } from '../components/app-bar/app-bar';
import {
  Box,
  Typography,
  Paper,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSavedBooks, useReadingGoals, getGoalPeriodRange } from '@mystacks/hooks';
import dayjs from 'dayjs';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import FlagIcon from '@mui/icons-material/Flag';

/** Normalize author name so "J.K. Rowling" and "J. K. Rowling" count as the same. */
function normalizeAuthorName(name: string): string {
  if (!name?.trim()) return 'Unknown';
  const trimmed = name.trim();
  const singleSpace = trimmed.replace(/\s+/g, ' ');
  const normalizedPeriods = singleSpace.replace(/\.\s*/g, '. ');
  return normalizedPeriods;
}

/** Sort books by completed date, newest first. */
function sortByCompletedDate(books: Book[]): Book[] {
  return [...books].sort((a, b) => {
    const da = a?.userRating?.completedDate ?? 0;
    const db = b?.userRating?.completedDate ?? 0;
    return db - da;
  });
}

/** Label for a goal period (e.g. "January 2026", "Winter 2026", "2026"). */
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

/** Count completed books with completedDate in [start, end] (Unix). */
function countCompletedInRange(books: Book[], start: number, end: number): number {
  return books.filter((b) => {
    const d = b?.userRating?.completedDate;
    if (d == null) return false;
    return d >= start && d <= end;
  }).length;
}

export interface InsightsPageProps extends PageProps {}

const expandSummarySx = {
  '& .MuiAccordionSummary-content': { flex: 1, minWidth: 0, width: '100%' },
  '& .MuiAccordionSummary-expandIconWrapper': { minWidth: 24, padding: 4, flexShrink: 0 },
  '& .MuiAccordionSummary-expandIconWrapper svg': { fontSize: 20 },
};

export const InsightsPage = (props: InsightsPageProps) => {
  const navigate = useNavigate();
  const [insightsTab, setInsightsTab] = useState(0);
  const { savedBooks, loadSavedBooks } = useSavedBooks(props.appState);
  const { goals, addGoal, loadFromStorage, getGoalPeriodRange } = useReadingGoals(props.appState);
  const [createGoalOpen, setCreateGoalOpen] = useState(false);

  React.useEffect(() => {
    loadSavedBooks();
  }, []);
  React.useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const goToBook = (book: Book) => {
    navigate('/book-info', { state: { bookId: book.id, lastPage: '/insights' } });
  };

  const handleBookKeyDown = (e: React.KeyboardEvent, book: Book) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToBook(book);
    }
  };

  const stats = useMemo(() => {
    const completed = savedBooks.filter(
      (b) => b?.userRating?.bookProgress === BookProgressStates.Completed
    );
    const thisYear = new Date().getFullYear();
    const completedThisYear = completed.filter(
      (b) =>
        b?.userRating?.completedDate &&
        dayjs.unix(b.userRating.completedDate).year() === thisYear
    );
    const pagesRead = (books: typeof completed) =>
      books.reduce(
        (sum, b) => sum + (Number(b?.bookInfo?.pageCount) || 0),
        0
      );
    const totalPages = pagesRead(completed);
    const pagesThisYear = pagesRead(completedThisYear);
    const withRating = completed.filter(
      (b) => b?.userRating?.rating != null && b.userRating.rating > 0
    );
    const avgRating =
      withRating.length > 0
        ? withRating.reduce((s, b) => s + (b?.userRating?.rating ?? 0), 0) /
          withRating.length
        : null;
    const ratingBuckets: { star: number; books: Book[] }[] = [5, 4, 3, 2, 1].map(
      (star) => ({
        star,
        books: sortByCompletedDate(
          completed.filter((b) => {
            const r = b?.userRating?.rating;
            if (r == null || r <= 0) return false;
            return Math.round(Number(r)) === star;
          })
        ),
      })
    );
    const authorToBooks: Record<string, Book[]> = {};
    completed.forEach((b) => {
      const raw = b?.bookInfo?.author?.trim() || 'Unknown';
      const author = normalizeAuthorName(raw);
      if (!authorToBooks[author]) authorToBooks[author] = [];
      authorToBooks[author].push(b);
    });
    const authorsWithBooks = Object.entries(authorToBooks)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10)
      .map(([author, books]) => ({ author, books: sortByCompletedDate(books) }));
    const yearToBooks: Record<number, Book[]> = {};
    completed.forEach((b) => {
      if (!b?.userRating?.completedDate) return;
      const y = dayjs.unix(b.userRating.completedDate).year();
      if (!yearToBooks[y]) yearToBooks[y] = [];
      yearToBooks[y].push(b);
    });
    const yearsWithBooks = Object.entries(yearToBooks)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .slice(0, 5)
      .map(([year, books]) => ({
        year: Number(year),
        books: sortByCompletedDate(books),
      }));

    return {
      totalCompleted: completed.length,
      completedThisYear: completedThisYear.length,
      totalPages,
      pagesThisYear,
      avgRating,
      ratingBuckets,
      authorsWithBooks,
      yearsWithBooks,
      thisYear,
    };
  }, [savedBooks]);

  const maxBooksInYear = Math.max(1, ...stats.yearsWithBooks.map((e) => e.books.length));
  const maxAuthorCount = Math.max(1, ...stats.authorsWithBooks.map((e) => e.books.length));
  const maxRatingCount = Math.max(1, ...stats.ratingBuckets.map((e) => e.books.length));

  const completedBooks = useMemo(
    () =>
      savedBooks.filter((b) => b?.userRating?.bookProgress === BookProgressStates.Completed),
    [savedBooks]
  );
  const now = dayjs().unix();
  const { currentGoals, pastGoals, goalProgress } = useMemo(() => {
    const current: ReadingGoal[] = [];
    const past: ReadingGoal[] = [];
    const progress: Record<string, number> = {};
    goals.forEach((g) => {
      const { start, end } = getGoalPeriodRange(g);
      const count = countCompletedInRange(completedBooks, start, end);
      progress[g.id] = count;
      if (end >= now) current.push(g);
      else past.push(g);
    });
    past.sort((a, b) => getGoalPeriodRange(b).end - getGoalPeriodRange(a).end);
    return { currentGoals: current, pastGoals: past, goalProgress: progress };
  }, [goals, completedBooks, now]);

  return (
    <CustomAppBar logoSize="sm" appState={props.appState}>
      <InsightsInner>
        <PageHeader>
          <Typography variant="h4" fontWeight="700" color="text.primary">
            Reading insights
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your reading stats at a glance
          </Typography>
        </PageHeader>

        <Tabs
          value={insightsTab}
          onChange={(_, v) => setInsightsTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Insights" id="insights-tab-0" aria-controls="insights-panel-0" />
          <Tab label="Goals" id="insights-tab-1" aria-controls="insights-panel-1" />
        </Tabs>

        {insightsTab === 0 && (
          <>

        <StatsGrid>
          <StatCard>
            <StatCardIconWrap color="primary">
              <MenuBookIcon />
            </StatCardIconWrap>
            <StatValue>{stats.completedThisYear}</StatValue>
            <StatLabel>Books in {stats.thisYear}</StatLabel>
          </StatCard>
          <StatCard>
            <StatCardIconWrap color="primary">
              <AutoStoriesIcon />
            </StatCardIconWrap>
            <StatValue>{stats.totalCompleted}</StatValue>
            <StatLabel>Total completed</StatLabel>
          </StatCard>
          <StatCard>
            <StatCardIconWrap color="secondary">
              <MenuBookIcon sx={{ transform: 'scale(0.9)' }} />
            </StatCardIconWrap>
            <StatValue>{stats.pagesThisYear.toLocaleString()}</StatValue>
            <StatLabel>Pages in {stats.thisYear}</StatLabel>
          </StatCard>
          <StatCard>
            <StatCardIconWrap color="secondary">
              <AutoStoriesIcon sx={{ transform: 'scale(0.9)' }} />
            </StatCardIconWrap>
            <StatValue>{stats.totalPages.toLocaleString()}</StatValue>
            <StatLabel>Total pages read</StatLabel>
          </StatCard>
        </StatsGrid>

        <SectionsGrid>
          {(stats.avgRating != null || stats.ratingBuckets.some((e) => e.books.length > 0)) && (
            <SectionCard elevation={0}>
              <SectionCardHeader>
                <StarIcon color="secondary" sx={{ fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight="600">
                  Average rating
                </Typography>
              </SectionCardHeader>
              {stats.avgRating != null && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="h4" fontWeight="700" color="secondary">
                    {stats.avgRating.toFixed(1)}
                  </Typography>
                  <StarIcon color="secondary" sx={{ fontSize: 32 }} />
                </Box>
              )}
              <RatingBucketsList>
                {stats.ratingBuckets.map(({ star, books }) => (
                  <AccordionRow key={star} disableGutters elevation={0} square>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={expandSummarySx}>
                      <RatingRow>
                        <RatingLabel>
                          {star} <StarIcon sx={{ fontSize: 14, verticalAlign: 'middle' }} />
                        </RatingLabel>
                        <RatingBarWrap>
                          <RatingBar
                            widthPercent={(books.length / maxRatingCount) * 100}
                            color="secondary"
                          />
                        </RatingBarWrap>
                        <RatingCount>{books.length}</RatingCount>
                      </RatingRow>
                    </AccordionSummary>
                    <AccordionDetails>
                      <BookList>
                        {books.map((book) => (
                          <BookEntry
                            key={book.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => goToBook(book)}
                            onKeyDown={(e) => handleBookKeyDown(e, book)}
                          >
                            {book.bookInfo?.title}
                            {book.bookInfo?.author && ` — ${book.bookInfo.author}`}
                          </BookEntry>
                        ))}
                      </BookList>
                    </AccordionDetails>
                  </AccordionRow>
                ))}
              </RatingBucketsList>
            </SectionCard>
          )}

          {stats.yearsWithBooks.length > 0 && (
            <SectionCard elevation={0}>
              <SectionCardHeader>
                <CalendarMonthIcon color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight="600">
                  Books by year
                </Typography>
              </SectionCardHeader>
              <YearsChart>
                {stats.yearsWithBooks.map(({ year, books }) => (
                  <AccordionRow key={year} disableGutters elevation={0} square>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={expandSummarySx}>
                      <YearRow>
                        <YearLabel>{year}</YearLabel>
                        <YearBarWrap>
                          <YearBar
                            widthPercent={(books.length / maxBooksInYear) * 100}
                            color="primary"
                          />
                        </YearBarWrap>
                        <YearCount>{books.length}</YearCount>
                      </YearRow>
                    </AccordionSummary>
                    <AccordionDetails>
                      <BookList>
                        {books.map((book) => (
                          <BookEntry
                            key={book.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => goToBook(book)}
                            onKeyDown={(e) => handleBookKeyDown(e, book)}
                          >
                            {book.bookInfo?.title}
                            {book.bookInfo?.author && ` — ${book.bookInfo.author}`}
                          </BookEntry>
                        ))}
                      </BookList>
                    </AccordionDetails>
                  </AccordionRow>
                ))}
              </YearsChart>
            </SectionCard>
          )}

          {stats.authorsWithBooks.length > 0 && (
            <SectionCard elevation={0}>
              <SectionCardHeader>
                <PersonIcon color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight="600">
                  Top authors
                </Typography>
              </SectionCardHeader>
              <AuthorsList>
                {stats.authorsWithBooks.map(({ author, books }) => (
                  <AccordionRow key={author} disableGutters elevation={0} square>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={expandSummarySx}>
                      <AuthorRow>
                        <AuthorName>{author}</AuthorName>
                        <AuthorBarWrap>
                          <AuthorBar
                            widthPercent={(books.length / maxAuthorCount) * 100}
                            color="secondary"
                          />
                        </AuthorBarWrap>
                        <AuthorCount>{books.length}</AuthorCount>
                      </AuthorRow>
                    </AccordionSummary>
                    <AccordionDetails>
                      <BookList>
                        {books.map((book) => (
                          <BookEntry
                            key={book.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => goToBook(book)}
                            onKeyDown={(e) => handleBookKeyDown(e, book)}
                          >
                            {book.bookInfo?.title}
                          </BookEntry>
                        ))}
                      </BookList>
                    </AccordionDetails>
                  </AccordionRow>
                ))}
              </AuthorsList>
            </SectionCard>
          )}
        </SectionsGrid>

        {savedBooks.length === 0 && (
          <EmptyState elevation={0}>
            <Typography color="text.secondary" textAlign="center">
              Add and complete books to see your insights here.
            </Typography>
          </EmptyState>
        )}
          </>
        )}

        {insightsTab === 1 && (
          <GoalsTab
            currentGoals={currentGoals}
            pastGoals={pastGoals}
            goalProgress={goalProgress}
            getGoalPeriodRange={getGoalPeriodRange}
            getGoalPeriodLabel={getGoalPeriodLabel}
            onAddGoal={() => setCreateGoalOpen(true)}
          />
        )}
      </InsightsInner>

      <CreateGoalDialog
        open={createGoalOpen}
        onClose={() => setCreateGoalOpen(false)}
        onSave={(goal) => {
          addGoal(goal);
          setCreateGoalOpen(false);
        }}
      />
    </CustomAppBar>
  );
};

export default InsightsPage;

// --- Goals tab & semi-circle chart ---

function SemiCircleChart({
  value,
  max,
  label,
  color = 'primary',
}: {
  value: number;
  max: number;
  label: string;
  color?: 'primary' | 'secondary';
}) {
  const theme = useTheme();
  const percent = max <= 0 ? 0 : Math.min(100, (value / max) * 100);
  const r = 50;
  const circumference = Math.PI * r;
  const dashLength = (percent / 100) * circumference;
  const trackColor = theme.palette.action.hover;
  const progressColor = theme.palette[color].main;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 320,
          aspectRatio: '120 / 70',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 120 70"
          style={{ overflow: 'visible', display: 'block' }}
          preserveAspectRatio="xMidYMax meet"
        >
          <path
            d={`M 10 70 A ${r} ${r} 0 0 1 110 70`}
            fill="none"
            stroke={trackColor}
            strokeWidth={10}
            strokeLinecap="round"
          />
          {percent > 0 && (
            <path
              d={`M 10 70 A ${r} ${r} 0 0 1 110 70`}
              fill="none"
              stroke={progressColor}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={`${dashLength} ${circumference}`}
              strokeDashoffset={0}
            />
          )}
        </svg>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 8,
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="700" color="text.primary">
            {value}/{max}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {label}
      </Typography>
    </Box>
  );
}

function GoalsTab({
  currentGoals,
  pastGoals,
  goalProgress,
  getGoalPeriodRange,
  getGoalPeriodLabel,
  onAddGoal,
}: {
  currentGoals: ReadingGoal[];
  pastGoals: ReadingGoal[];
  goalProgress: Record<string, number>;
  getGoalPeriodRange: (g: ReadingGoal) => { start: number; end: number };
  getGoalPeriodLabel: (g: ReadingGoal) => string;
  onAddGoal: () => void;
}) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="600" color="text.secondary">
          Books completed
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={onAddGoal}
          color="primary"
        >
          New goal
        </Button>
      </Box>

      {currentGoals.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="600" color="text.primary" sx={{ mb: 1.5 }}>
            Current goals
          </Typography>
          <GoalsChartGrid>
            {currentGoals.map((g) => (
              <GoalCard key={g.id} elevation={0}>
                <SemiCircleChart
                  value={goalProgress[g.id] ?? 0}
                  max={g.target}
                  label={getGoalPeriodLabel(g)}
                  color="primary"
                />
              </GoalCard>
            ))}
          </GoalsChartGrid>
        </Box>
      )}

      {pastGoals.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight="600" color="text.primary" sx={{ mb: 1.5 }}>
            Past goals
          </Typography>
          <PastGoalsList>
            {pastGoals.map((g) => (
              <PastGoalRow key={g.id}>
                <Typography variant="body2">{getGoalPeriodLabel(g)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Goal: {g.target} · Result: {goalProgress[g.id] ?? 0}
                </Typography>
              </PastGoalRow>
            ))}
          </PastGoalsList>
        </Box>
      )}

      {currentGoals.length === 0 && pastGoals.length === 0 && (
        <EmptyState elevation={0} sx={{ mt: 2 }}>
          <FlagIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography color="text.secondary" textAlign="center">
            No goals yet. Create a goal to track books completed per month, season, or year.
          </Typography>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddGoal} sx={{ mt: 2 }}>
            Create goal
          </Button>
        </EmptyState>
      )}
    </Box>
  );
}

function CreateGoalDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (goal: Omit<ReadingGoal, 'id'>) => void;
}) {
  const [periodType, setPeriodType] = useState<ReadingGoalPeriodType>('month');
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [season, setSeason] = useState<ReadingGoalSeason>('winter');
  const [target, setTarget] = useState(3);

  const handleSubmit = useCallback(() => {
    const base = { periodType, year, target };
    if (periodType === 'month') onSave({ ...base, month });
    else if (periodType === 'season') onSave({ ...base, season });
    else onSave(base);
    setPeriodType('month');
    setYear(dayjs().year());
    setMonth(dayjs().month() + 1);
    setSeason('winter');
    setTarget(3);
  }, [periodType, year, month, season, target, onSave]);

  const seasons: { value: ReadingGoalSeason; label: string }[] = [
    { value: 'winter', label: 'Winter (Jan–Mar)' },
    { value: 'spring', label: 'Spring (Apr–Jun)' },
    { value: 'summer', label: 'Summer (Jul–Sep)' },
    { value: 'fall', label: 'Fall (Oct–Dec)' },
  ];
  const years = Array.from({ length: 5 }, (_, i) => dayjs().year() + i);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create reading goal</DialogTitle>
      <DialogContent>
        <FormControl fullWidth size="small" sx={{ mt: 1, mb: 2 }}>
          <InputLabel>Period type</InputLabel>
          <Select
            value={periodType}
            label="Period type"
            onChange={(e) => setPeriodType(e.target.value as ReadingGoalPeriodType)}
          >
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="season">Season</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </FormControl>
        {periodType === 'month' && (
          <>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Month</InputLabel>
              <Select
                value={month}
                label="Month"
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <MenuItem key={m} value={m}>
                    {dayjs().month(m - 1).format('MMMM')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Year</InputLabel>
              <Select value={year} label="Year" onChange={(e) => setYear(Number(e.target.value))}>
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        {periodType === 'season' && (
          <>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Season</InputLabel>
              <Select
                value={season}
                label="Season"
                onChange={(e) => setSeason(e.target.value as ReadingGoalSeason)}
              >
                {seasons.map((s) => (
                  <MenuItem key={s.value} value={s.value}>
                    {s.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Year</InputLabel>
              <Select value={year} label="Year" onChange={(e) => setYear(Number(e.target.value))}>
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        {periodType === 'year' && (
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Year</InputLabel>
            <Select value={year} label="Year" onChange={(e) => setYear(Number(e.target.value))}>
              {years.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField
          fullWidth
          size="small"
          label="Books to complete"
          type="number"
          inputProps={{ min: 1, max: 999 }}
          value={target}
          onChange={(e) => setTarget(Math.max(1, parseInt(String(e.target.value), 10) || 1))}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const GoalsChartGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  },
}));

const GoalCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
}));

const PastGoalsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.75),
}));

const PastGoalRow = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.25, 1.5),
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const InsightsInner = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  margin: '20px auto 0',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  [theme.breakpoints.up('md')]: {
    maxWidth: 'none',
    width: '100%',
    marginTop: 50,
    padding: theme.spacing(3, 4),
  },
}));

const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing(3),
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px 0 0 4px',
  },
}));

const StatCardIconWrap = styled(Box)<{ color: 'primary' | 'secondary' }>(
  ({ theme, color }) => {
    const main = color === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main;
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: main + '18',
      color: main,
      marginBottom: theme.spacing(1),
    };
  }
);

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.8125rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

const SectionsGrid = styled(Box)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(3),
    alignItems: 'stretch',
  },
}));

const SectionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  [theme.breakpoints.up('md')]: {
    marginBottom: 0,
  },
}));

const SectionCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const AccordionRow = styled(Accordion)(({ theme }) => ({
  '&:before': { display: 'none' },
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-of-type': { borderBottom: 'none' },
}));

const BookList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.75),
}));

const BookEntry = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.25, 1.5),
  borderRadius: 8,
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.action.hover,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const RatingBucketsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  marginTop: theme.spacing(2),
}));

const RatingRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '36px 1fr 28px',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
  minWidth: 0,
}));

const RatingLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const RatingBarWrap = styled(Box)(({ theme }) => ({
  height: 20,
  borderRadius: 4,
  backgroundColor: theme.palette.action.hover,
  overflow: 'hidden',
}));

const RatingBar = styled(Box)<{
  widthPercent: number;
  color: 'primary' | 'secondary';
}>(({ theme, widthPercent, color }) => ({
  height: '100%',
  width: `${widthPercent}%`,
  minWidth: widthPercent > 0 ? 6 : 0,
  borderRadius: 4,
  backgroundColor: color === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main,
  transition: 'width 0.3s ease',
}));

const RatingCount = styled(Typography)(({ theme }) => ({
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textAlign: 'right',
}));

const YearsChart = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  marginTop: theme.spacing(2),
}));

const YearRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '40px 1fr 36px',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  width: '100%',
  minWidth: 0,
}));

const YearLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const YearBarWrap = styled(Box)(({ theme }) => ({
  height: 24,
  borderRadius: 6,
  backgroundColor: theme.palette.action.hover,
  overflow: 'hidden',
}));

const YearBar = styled(Box)<{ widthPercent: number; color: 'primary' | 'secondary' }>(
  ({ theme, widthPercent, color }) => ({
    height: '100%',
    width: `${widthPercent}%`,
    minWidth: widthPercent > 0 ? 8 : 0,
    borderRadius: 6,
    backgroundColor: color === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main,
    transition: 'width 0.3s ease',
  })
);

const YearCount = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textAlign: 'right',
}));

const AuthorsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  marginTop: theme.spacing(2),
}));

const AuthorRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 1fr 28px',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
  minWidth: 0,
}));

const AuthorName = styled(Typography)(({ theme }) => ({
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const AuthorBarWrap = styled(Box)(({ theme }) => ({
  height: 20,
  borderRadius: 4,
  backgroundColor: theme.palette.action.hover,
  overflow: 'hidden',
}));

const AuthorBar = styled(Box)<{
  widthPercent: number;
  color: 'primary' | 'secondary';
}>(({ theme, widthPercent, color }) => ({
  height: '100%',
  width: `${widthPercent}%`,
  minWidth: widthPercent > 0 ? 6 : 0,
  borderRadius: 4,
  backgroundColor: color === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main,
  transition: 'width 0.3s ease',
}));

const AuthorCount = styled(Typography)(({ theme }) => ({
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textAlign: 'right',
}));

const EmptyState = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 12,
  border: `1px dashed ${theme.palette.divider}`,
}));
