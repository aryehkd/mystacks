import type { Meta, StoryObj } from '@storybook/react';

import { AccountLoginForm } from './account-login-form';
import { useLogin } from '@mystacks/account';

export const AccountLoginFormStory = () => {
  const AccountLoginProps = useLogin()

  return (
    <AccountLoginForm 
      {...AccountLoginProps}
    />
  )
}

const meta: Meta<typeof AccountLoginFormStory> = {
  component: AccountLoginFormStory,
};

export default meta;
type Story = StoryObj<typeof AccountLoginFormStory>;

//👇 Throws a type error it the args don't match the component props
export const Primary: Story = {
  args: {},
};
