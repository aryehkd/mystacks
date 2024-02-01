import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

import { BookSearchForm } from './book-search-form';
import { useBookSearchForm } from '@mystacks/book-search-form'
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

export const BookSearchFormStory = () => {
  const accountLoginProps = useBookSearchForm()

  return (
    <StoryContainer>
      <BookSearchForm 
        {...accountLoginProps}
      />
    </StoryContainer>
  )
}

export default {
  title: 'Book Search',
  render: () => <BookSearchFormStory />,
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
