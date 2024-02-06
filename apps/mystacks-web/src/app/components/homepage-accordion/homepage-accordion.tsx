import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Book, BookProgressStates } from '@mystacks/types';
import { BookItem } from '../../elements/book/book';
import { styled } from '@mui/material/styles';

export interface HomepageAccordionProps {
    books: Book[] // TODO: this is temp
}

// TODO: "shelves" are hard coded, make these dynamic / editable, pulled from firestore  

export const HomepageAccordion = (props: HomepageAccordionProps) => {

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Currently Reading  ( {props.books.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading).length} )
        </AccordionSummary>
        <AccordionDetails>
            <StyledBox>
                {props.books.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading).map((book, index) => <BookContainer key={index}><BookItem book={book}/></BookContainer>)}
            </StyledBox>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          To Read ( {props.books.filter(book => book?.userRating?.bookProgress == BookProgressStates.ToRead).length} )
        </AccordionSummary>
        <AccordionDetails>
          <StyledBox>
              {props.books.filter(book => book?.userRating?.bookProgress == BookProgressStates.ToRead).map((book, index) => <BookContainer key={index}><BookItem book={book}/></BookContainer>)}
          </StyledBox>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Completed Books ( {props.books.filter(book => book?.userRating?.bookProgress == BookProgressStates.Completed).length} )
        </AccordionSummary>
        <AccordionDetails>
          <StyledBox>
              {props.books.filter(book => book?.userRating?.bookProgress == BookProgressStates.Completed).map((book, index) => <BookContainer key={index}><BookItem book={book}/></BookContainer>)}
          </StyledBox>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          Recommended ( {props.books.filter(book => book?.userRating?.bookProgress == BookProgressStates.Recommended).length} )
        </AccordionSummary>
        <AccordionDetails>
          <StyledBox>
              {props.books.filter(book => book?.userRating?.bookProgress == BookProgressStates.Recommended).map((book, index) => <BookContainer key={index}><BookItem book={book}/></BookContainer>)}
          </StyledBox>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row"
}));

const BookContainer = styled(Box)(({ theme }) => ({
    margin: "0 10px"
}));