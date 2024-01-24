import type { Meta, StoryObj } from '@storybook/react';

import { BookSearch } from './book-search';

export const BookSearchStory = () => {

  return (
    <BookSearch 

    />
  )
}

const meta: Meta<typeof BookSearchStory> = {
  component: BookSearchStory,
};

export default meta;
type Story = StoryObj<typeof BookSearchStory>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {},
};
