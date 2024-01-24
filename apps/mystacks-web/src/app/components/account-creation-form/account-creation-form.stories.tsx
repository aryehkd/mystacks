import type { Meta, StoryObj } from '@storybook/react';

import { AccountCreationForm } from './account-creation-form';
import { useSignUp } from '@mystacks/account';

export const AccountCreationFormStory = () => {
  const AccountCreationProps = useSignUp()

  return (
    <AccountCreationForm 
      {...AccountCreationProps}
    />
  )
}

const meta: Meta<typeof AccountCreationFormStory> = {
  component: AccountCreationFormStory,
};

export default meta;
type Story = StoryObj<typeof AccountCreationFormStory>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {},
};
