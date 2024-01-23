import { render } from '@testing-library/react';

import BookSearchResults from './book-search-results';

describe('BookSearchResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookSearchResults />);
    expect(baseElement).toBeTruthy();
  });
});
