import type { Meta, StoryObj } from '@storybook/react';

import { BookSearchForm } from './book-search-form';
import { useBookSearchForm } from '@mystacks/book-search-form'

export const BookSearchFormStory = () => {
  const { inputValue, handleInputValueChange, handleBookSeach } = useBookSearchForm()

  return (
    <BookSearchForm 
      inputValue={inputValue} 
      handleInputValueChange={handleInputValueChange}
      handleBookSeach={handleBookSeach}
    />
  )
}

const meta: Meta<typeof BookSearchFormStory> = {
  component: BookSearchFormStory,
};

export default meta;
type Story = StoryObj<typeof BookSearchFormStory>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {},
};
