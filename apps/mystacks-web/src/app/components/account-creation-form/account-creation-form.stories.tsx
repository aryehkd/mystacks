import { AccountCreationForm } from './account-creation-form';
import { useSignUp } from '@mystacks/account';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';
import { AppState } from '@mystacks/types';
import { State } from '@hookstate/core';

export const AccountCreationFormStory = () => {
  const AccountCreationProps = useSignUp({} as State<Partial<AppState>>)

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
