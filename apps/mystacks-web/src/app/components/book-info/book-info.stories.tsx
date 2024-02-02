import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

import { BookInfo } from './book-info';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

export const BookInfoStory = () => {

  return (
    <StoryContainer>
      <BookInfo book={{
          title: "Aliss at the Fire",
          author: "Jon Fosse",
          imgUrl: "http://books.google.com/books/content?id=UDXpzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        }}/>
    </StoryContainer>
  )
}

export default {
  title: 'Book Info',
  render: () => <BookInfoStory />,
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
