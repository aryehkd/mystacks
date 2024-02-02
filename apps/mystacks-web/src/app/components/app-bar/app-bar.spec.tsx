import { render } from '@testing-library/react';
import { CustomAppBarStory } from './app-bar.stories';

import { NavigateOptions, To } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: (to: To, options?: NavigateOptions): void => {}
}));

describe('CustomAppBar', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<CustomAppBarStory />);
    expect(baseElement).toBeTruthy();
  });
});
