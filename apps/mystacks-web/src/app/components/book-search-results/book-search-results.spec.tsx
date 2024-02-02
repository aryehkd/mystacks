import { render } from '@testing-library/react';

import { BookSearchResultsStory } from './book-search-results.stories';
import { NavigateOptions, To } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: (to: To, options?: NavigateOptions): void => {}
}));

describe('BookSearchResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookSearchResultsStory />);
    expect(baseElement).toBeTruthy();
  });
});
