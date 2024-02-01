import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

import { AccountLoginForm } from './account-login-form';
import { useLogin } from '@mystacks/account';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

export const AccountLoginFormStory = () => {
  const accountLoginProps = useLogin({} as any, true)

  return (
    <StoryContainer>
      <AccountLoginForm 
        {...accountLoginProps}
        isStoryBook={true}
      />
    </StoryContainer>
  )
}

export default {
  title: 'User Login',
  render: () => <AccountLoginFormStory />,
  decorators: [withRouter, StorybookThemeProvider],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/login' },
    }),
  },
};

const StoryContainer = styled(Box)(({ theme }) => ({
  width: "500px",
}));
