import type { Meta, StoryObj } from '@storybook/react';

import { BookSearchResults } from './book-search-results';
import { useBookSearchForm } from '@mystacks/book-search-form';

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

const meta: Meta<typeof BookSearchResultsStory> = {
  component: BookSearchResultsStory,
};

export default meta;
type Story = StoryObj<typeof BookSearchResultsStory>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {},
};
