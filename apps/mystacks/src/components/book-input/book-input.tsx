import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface BookInputProps {}

const StyledBookInput = styled.div`
  color: pink;
`;

export function BookInput(props: BookInputProps) {
  return (
    <StyledBookInput>
      <h1>Welcome to BookInput!</h1>
    </StyledBookInput>
  );
}

export default BookInput;
