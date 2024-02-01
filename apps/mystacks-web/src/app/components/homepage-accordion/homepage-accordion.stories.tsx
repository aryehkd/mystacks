import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

import { HomepageAccordion } from './homepage-accordion';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

export const AccountLoginFormStory = () => {

  const SearchResults = [
    {
      title: "Aliss at the Fire",
      author: "Jon Fosse",
      imgUrl: "http://books.google.com/books/content?id=UDXpzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
      title: "The Year of the Hare",
      author: "Arto Paasilinna",
      imgUrl: "http://books.google.com/books/content?id=LLlz8qszNG8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
      title: "Outline",
      author: "Rachel Cusk",
      imgUrl: "http://books.google.com/books/content?id=FuwCBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
  ]

  return (
    <StoryContainer>
      <HomepageAccordion books={SearchResults}/>
    </StoryContainer>
  )
}

export default {
  title: 'Homepage Accordion',
  render: () => <AccountLoginFormStory />,
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
