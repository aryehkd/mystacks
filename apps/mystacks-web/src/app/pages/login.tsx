import React from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { PageProps } from '@mystacks/types'
import { AccountLoginForm } from '../components/account-login-form';
import { useLogin } from '@mystacks/account';

/* eslint-disable-next-line */
export interface LoginPageProps extends PageProps {

}

export const LoginPage = (props: LoginPageProps) => {
    const AccountLoginProps = useLogin(props.appState)

    return (
      <SignUpOuterContainer>
        <SignUpInnerContainer>
          <AccountLoginForm 
            {...AccountLoginProps}
          />
        </SignUpInnerContainer>
      </SignUpOuterContainer>
    )
}

export default LoginPage;

const SignUpOuterContainer = styled(Box)(({ theme }) => ({
  display: "flex", 
  justifyContent: "center"
}));

const SignUpInnerContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  margin: "50px 0 0 0"
}));