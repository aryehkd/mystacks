import { render } from '@testing-library/react';

import { CardStory } from './card.stories';

describe('Card', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<CardStory />);
    expect(baseElement).toBeTruthy();
  });
});
