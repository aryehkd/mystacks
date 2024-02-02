import { render } from '@testing-library/react';

import { AccountCreationFormStory } from './account-creation-form.stories';
import { NavigateOptions, To } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: (to: To, options?: NavigateOptions): void => {}
}));

describe('AccountCreationForm', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<AccountCreationFormStory />);
    expect(baseElement).toBeTruthy();
  });
});
