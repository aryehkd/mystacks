import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';
import { Book } from '@mystacks/types';

export const CardStory = () => {

  const props = {
    book: {
      bookInfo: {
        title: "Aliss at the Fire",
        author: "Jon Fosse",
        imgUrl: "http://books.google.com/books/content?id=UDXpzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      }
    } as Book
  }

  return (
    <Card 
      {...props}
    />
  )
}

const meta: Meta<typeof CardStory> = {
  component: CardStory,
};

export default meta;
type Story = StoryObj<typeof CardStory>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {},
};
