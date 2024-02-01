import React from 'react'
import { PageProps } from '@mystacks/types'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { AccountCreationForm } from '../components/account-creation-form/account-creation-form'
import { useSignUp } from '@mystacks/account';

/* eslint-disable-next-line */
export interface SignUpPapeProps extends PageProps {

}

export const SignUpPage = (props: SignUpPapeProps) => {
    const AccountCreationProps = useSignUp(props.appState)

    return (
        <SignUpOuterContainer>
            <SignUpInnerContainer>
                <AccountCreationForm 
                    {...AccountCreationProps}
                />
            </SignUpInnerContainer>
        </SignUpOuterContainer>
    )
}

export default SignUpPage;

const SignUpOuterContainer = styled(Box)(({ theme }) => ({
    display: "flex", 
    justifyContent: "center"
}));

const SignUpInnerContainer = styled(Box)(({ theme }) => ({
    width: "50%"
}));