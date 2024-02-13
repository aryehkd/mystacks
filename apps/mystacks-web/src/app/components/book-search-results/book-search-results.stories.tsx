import { BookSearchResults } from './book-search-results';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'
import { BookProgressStates, BookRating } from '@mystacks/types';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

export const BookSearchResultsStory = () => {

  return (
    <BookSearchResults 
      SearchResults={[
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
      ]}
    />
  )
}

export default {
  title: 'Search Results',
  render: () => <BookSearchResultsStory />,
  decorators: [withRouter, StorybookThemeProvider],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/login' },
    }),
  },};
