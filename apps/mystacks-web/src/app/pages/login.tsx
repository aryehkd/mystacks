import React from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { PageProps } from '@mystacks/types'
import { AccountLoginForm } from '../components/account-login-form';
import { CustomAppBar } from '../components/app-bar/app-bar';
import { useLogin } from '@mystacks/account';

/* eslint-disable-next-line */
export interface LoginPageProps extends PageProps {

}

export const LoginPage = (props: LoginPageProps) => {
    const AccountLoginProps = useLogin(props.appState)

    return (
      
      <CustomAppBar logoSize='lg'>
        <SignUpInnerContainer>
          <AccountLoginForm 
            {...AccountLoginProps}
          />
        </SignUpInnerContainer>
      </CustomAppBar>
    )
}

export default LoginPage;

const SignUpInnerContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  margin: "50px 0 0 0"
}));