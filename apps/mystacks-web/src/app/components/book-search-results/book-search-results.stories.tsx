import type { Meta, StoryObj } from '@storybook/react';

import { BookSearchResults } from './book-search-results';
import { useBookSearchResults } from '@mystacks/book-search-results'

export const BookSearchResultsStory = () => {
  const {} = useBookSearchResults()

  return (
    <BookSearchResults 

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
