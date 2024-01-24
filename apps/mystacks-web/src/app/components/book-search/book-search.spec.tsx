import { render } from '@testing-library/react';

import { BookSearchStory } from './book-search.stories';

describe('BookSearch', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<BookSearchStory />);
    expect(baseElement).toBeTruthy();
  });
});
