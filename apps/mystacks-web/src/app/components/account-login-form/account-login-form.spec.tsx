import { render } from '@testing-library/react';

import { AccountLoginFormStory } from './account-login-form.stories';

describe('AccountLoginForm', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<AccountLoginFormStory />);
    expect(baseElement).toBeTruthy();
  });
});
