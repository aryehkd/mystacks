import { render } from '@testing-library/react';

import { CardStory } from './card.stories';
import { NavigateOptions, To } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: (to: To, options?: NavigateOptions): void => {}
}));

describe('Card', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<CardStory />);
    expect(baseElement).toBeTruthy();
  });
});
