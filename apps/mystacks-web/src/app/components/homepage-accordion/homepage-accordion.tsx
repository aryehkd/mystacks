import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Book } from '@mystacks/types';
import { BookItem } from '../../elements/book/book';
import { styled } from '@mui/material/styles';

export interface HomepageAccordionProps {
    books: Book[] // TODO: this is temp
}

// TODO: "shelves" are hard coded, make these dynamic / editable, pulled from firestore  

export const HomepageAccordion = (props: HomepageAccordionProps) => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Currently Reading  ( {props.books.length} )
        </AccordionSummary>
        <AccordionDetails>
            <StyledBox>
                {props.books.map(book => <BookContainer><BookItem book={book}/></BookContainer>)}
            </StyledBox>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          To Read
        </AccordionSummary>
        <AccordionDetails>
 
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Completed Books
        </AccordionSummary>
        <AccordionDetails>
 
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          Abandoned
        </AccordionSummary>
        <AccordionDetails>
 
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