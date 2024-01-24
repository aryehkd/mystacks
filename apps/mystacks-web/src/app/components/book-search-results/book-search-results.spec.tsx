import { render } from '@testing-library/react';

import { BookSearchResultsStory } from './book-search-results.stories';

describe('BookSearchResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookSearchResultsStory />);
    expect(baseElement).toBeTruthy();
  });
});
