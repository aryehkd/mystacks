import { render } from '@testing-library/react';

import { HomePageAccordionStory } from './homepage-accordion.stories';
import { NavigateOptions, To } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: (to: To, options?: NavigateOptions): void => {}
}));

describe('HomePageAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomePageAccordionStory />);
    expect(baseElement).toBeTruthy();
  });
});
