import { render } from '@testing-library/react';

import { AccountLoginFormStory } from './account-login-form.stories';
import { NavigateOptions, To } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: (to: To, options?: NavigateOptions): void => {}
}));
describe('AccountLoginForm', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<AccountLoginFormStory />);
    expect(baseElement).toBeTruthy();
  });
});
