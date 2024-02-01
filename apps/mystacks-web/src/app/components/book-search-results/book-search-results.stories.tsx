import type { Meta, StoryObj } from '@storybook/react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { BookSearchResults } from './book-search-results';
import { useBookSearchForm } from '@mystacks/book-search-form';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

export const BookSearchResultsStory = () => {
  const { saveBook } = useBookSearchForm()

  return (
    <BookSearchResults 
      SearchResults={[
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
      ]}
      saveBook={saveBook}
    />
  )
}

export default {
  title: 'Search Results',
  render: () => <BookSearchResultsStory />,
  decorators: [StorybookThemeProvider],
};

const StoryContainer = styled(Box)(({ theme }) => ({
  width: "100%",
}));
