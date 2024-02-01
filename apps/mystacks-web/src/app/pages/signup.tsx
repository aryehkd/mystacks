import React from 'react'
import { PageProps } from '@mystacks/types'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { AccountCreationForm } from '../components/account-creation-form/account-creation-form'
import { useSignUp } from '@mystacks/account';
import { CustomAppBar } from '../components/app-bar/app-bar';

/* eslint-disable-next-line */
export interface SignUpPapeProps extends PageProps {

}

export const SignUpPage = (props: SignUpPapeProps) => {
    const AccountCreationProps = useSignUp(props.appState)

    return (
        <CustomAppBar logoSize='lg'>
            <SignUpInnerContainer>
                <AccountCreationForm 
                    {...AccountCreationProps}
                />
            </SignUpInnerContainer>
        </CustomAppBar>
    )
}

export default SignUpPage;

const SignUpInnerContainer = styled(Box)(({ theme }) => ({
    width: "50%",
    margin: "50px 0 0 0"
}));