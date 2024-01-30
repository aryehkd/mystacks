import React from 'react'
import { PageProps } from '@mystacks/types'
import { AccountLoginForm } from '../components/account-login-form';
import { useLogin } from '@mystacks/account';

/* eslint-disable-next-line */
export interface LoginPageProps extends PageProps {

}

export const LoginPage = (props: LoginPageProps) => {
    const AccountLoginProps = useLogin(props.appState)

    return (
      <AccountLoginForm 
        {...AccountLoginProps}
      />
    )
}

export default LoginPage;