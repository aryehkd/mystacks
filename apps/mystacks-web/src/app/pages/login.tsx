import React from 'react'
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { PageProps } from '@mystacks/types'
import { AccountLoginForm } from '../components/account-login-form';
import { LoginAppBar } from '../components/app-bar/app-bar';
import { useLogin } from '@mystacks/account';

/* eslint-disable-next-line */
export interface LoginPageProps extends PageProps {

}

export const LoginPage = (props: LoginPageProps) => {
    const AccountLoginProps = useLogin(props.appState)

    return (
      
      <LoginAppBar>
        <LoginOuterContainer container>
          <LoginInnerContainer xs={12} sm={8} md={6}>
            <AccountLoginForm 
              {...AccountLoginProps}
            />
          </LoginInnerContainer>
        </LoginOuterContainer>
      </LoginAppBar>
    )
}

export default LoginPage;

const LoginOuterContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const LoginInnerContainer = styled(Grid)(({ theme }) => ({
  padding: "40px 20px"
}));
