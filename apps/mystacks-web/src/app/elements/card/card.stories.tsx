import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';

export const CardStory = () => {

  return (
    <Card 
      title={"Aliss at the Fire"}
      subtitle={"Jon Fosse"}
      imgUrl={"http://books.google.com/books/content?id=UDXpzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"}
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
