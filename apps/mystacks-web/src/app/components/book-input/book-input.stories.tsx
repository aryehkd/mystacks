import type { Meta, StoryObj } from '@storybook/react';

import { BookInput } from './book-input';
import { useBookInput } from '@mystacks/book-input'

const BookInputStory = () => {
  const { inputValue, handleInputValueChange, search } = useBookInput()

  return (
    <BookInput 
      inputValue={inputValue} 
      handleInputValueChange={handleInputValueChange}
      search={search}
    />
  )
}

const meta: Meta<typeof BookInputStory> = {
  component: BookInputStory,
};

export default meta;
type Story = StoryObj<typeof BookInputStory>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {},
};
