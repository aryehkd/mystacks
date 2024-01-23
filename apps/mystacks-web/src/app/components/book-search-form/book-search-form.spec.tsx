import { render } from '@testing-library/react';

import { BookSearchFormStory } from './book-search-form.stories';

describe('BookSearchForm', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<BookSearchFormStory />);
    expect(baseElement).toBeTruthy();
  });
});
