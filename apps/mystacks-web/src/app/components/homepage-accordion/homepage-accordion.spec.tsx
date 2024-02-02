import { render } from '@testing-library/react';

import { HomePageAccordionStory } from './homepage-accordion.stories';

describe('HomePageAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomePageAccordionStory />);
    expect(baseElement).toBeTruthy();
  });
});
