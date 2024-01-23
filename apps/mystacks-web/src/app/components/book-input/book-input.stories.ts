import type { Meta, StoryObj } from '@storybook/react';

import { BookInput } from './book-input';

const meta: Meta<typeof BookInput> = {
  component: BookInput,
};

export default meta;
type Story = StoryObj<typeof BookInput>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {},
};
