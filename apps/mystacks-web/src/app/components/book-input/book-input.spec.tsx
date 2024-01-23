import { render } from '@testing-library/react';

import BookInput from './book-input';

describe('BookInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookInput />);
    expect(baseElement).toBeTruthy();
  });
});
