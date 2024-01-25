import React from 'react'
import { PageProps } from '@mystacks/types'

import { AccountCreationForm } from '../components/account-creation-form/account-creation-form'
import { useSignUp } from '@mystacks/account';

/* eslint-disable-next-line */
export interface SignUpPapeProps extends PageProps {

}

export const SignUpPage = (props: SignUpPapeProps) => {
    const AccountCreationProps = useSignUp()

    return (
        <AccountCreationForm 
            {...AccountCreationProps}
        />
    )
}

export default SignUpPage;