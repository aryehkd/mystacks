import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

import { HomepageAccordion } from './homepage-accordion';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'
import { BookProgressStates, BookRating } from '@mystacks/types';

export const HomePageAccordionStory = () => {

  const SearchResults = [
    {
      id: 'string,',
      savedDate: 123,
      bookInfo: {
        title: "Aliss at the Fire",
        author: "Jon Fosse",
        imgUrl: "http://books.google.com/books/content?id=UDXpzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        industryIdentifiers: {
          isbn13: '',
          isbn10: ''
        },
      },
      userRating: {
        rating: 5 as BookRating,
        notes: "This is a great book",
        bookProgress: BookProgressStates.Completed,
        
      }
    },
  ]

  return (
    <StoryContainer>
      <HomepageAccordion books={SearchResults}/>
    </StoryContainer>
  )
}

export default {
  title: 'Homepage Accordion',
  render: () => <HomePageAccordionStory />,
  decorators: [withRouter, StorybookThemeProvider],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/' },
    }),
  },
};

const StoryContainer = styled(Box)(({ theme }) => ({
  width: "100%",
}));
