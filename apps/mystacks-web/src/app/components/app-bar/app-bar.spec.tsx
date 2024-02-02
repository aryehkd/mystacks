import { render } from '@testing-library/react';

import { CustomAppBarStory } from './app-bar.stories';

describe('CustomAppBar', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<CustomAppBarStory />);
    expect(baseElement).toBeTruthy();
  });
});
