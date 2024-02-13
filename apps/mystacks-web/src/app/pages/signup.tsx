import React from 'react'
import { PageProps } from '@mystacks/types'
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { AccountCreationForm } from '../components/account-creation-form/account-creation-form'
import { useSignUp } from '@mystacks/account';
import { LoginAppBar } from '../components/app-bar/app-bar';

/* eslint-disable-next-line */
export interface SignUpPapeProps extends PageProps {

}

export const SignUpPage = (props: SignUpPapeProps) => {
    const AccountCreationProps = useSignUp(props.appState)

    return (
        <LoginAppBar>
            <SignUpOuterContainer container>
                <SignUpInnerContainer xs={12} sm={8} md={6}>
                    <AccountCreationForm 
                        {...AccountCreationProps}
                    />
                </SignUpInnerContainer>
            </SignUpOuterContainer>
        </LoginAppBar>
    )
}

export default SignUpPage;

const SignUpOuterContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
  }));
  
  const SignUpInnerContainer = styled(Grid)(({ theme }) => ({
    padding: "40px 20px"
  }));