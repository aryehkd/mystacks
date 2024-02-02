import { render } from '@testing-library/react';

import { BookInfoStory } from './book-info.stories';
import { NavigateOptions, To } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: (to: To, options?: NavigateOptions): void => {}
}));

describe('BookInfo', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<BookInfoStory />);
    expect(baseElement).toBeTruthy();
  });
});
