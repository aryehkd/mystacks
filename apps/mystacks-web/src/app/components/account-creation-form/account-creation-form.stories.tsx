import type { Meta, StoryObj } from '@storybook/react';

import { AccountCreationForm } from './account-creation-form';
import { useSignUp } from '@mystacks/account';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

export const AccountCreationFormStory = () => {
  const AccountCreationProps = useSignUp({} as any)

  return (
    <AccountCreationForm 
      {...AccountCreationProps}
    />
  )
}

export default {
  title: 'User SignUp',
  render: () => <AccountCreationFormStory />,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/sign-up' },
    }),
  },
};
