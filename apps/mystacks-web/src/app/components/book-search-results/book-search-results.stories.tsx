import { BookSearchResults } from './book-search-results';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

export const BookSearchResultsStory = () => {

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
    />
  )
}

export default {
  title: 'Search Results',
  render: () => <BookSearchResultsStory />,
  decorators: [StorybookThemeProvider],
};
