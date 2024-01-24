import { render } from '@testing-library/react';

import { AccountCreationFormStory } from './account-creation-form.stories';

describe('AccountCreationForm', () => {
  it('should render successfully', () => {

    const { baseElement } = render(<AccountCreationFormStory />);
    expect(baseElement).toBeTruthy();
  });
});
