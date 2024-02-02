import { render } from '@testing-library/react';

import { BookInfoStory } from './book-info.stories';

describe('BookInfo', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<BookInfoStory />);
    expect(baseElement).toBeTruthy();
  });
});
