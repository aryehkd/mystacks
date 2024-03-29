import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

import { CustomAppBar } from './app-bar';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

export const CustomAppBarStory = () => {

  return (
    <StoryContainer>
      <CustomAppBar logoSize='lg'><></></CustomAppBar>
    </StoryContainer>
  )
}

export default {
  title: 'App Bar',
  render: () => <CustomAppBarStory />,
  decorators: [withRouter, StorybookThemeProvider],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/login' },
    }),
  },
};

const StoryContainer = styled(Box)(({ theme }) => ({
  width: "100%",
}));
