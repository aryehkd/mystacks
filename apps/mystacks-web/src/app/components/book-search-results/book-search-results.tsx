import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface BookSearchResultsProps {}

const StyledBookSearchResults = styled.div`
  color: pink;
`;

export function BookSearchResults(props: BookSearchResultsProps) {
  return (
    <StyledBookSearchResults>
      <h1>Welcome to BookSearchResults!</h1>
    </StyledBookSearchResults>
  );
}

export default BookSearchResults;
