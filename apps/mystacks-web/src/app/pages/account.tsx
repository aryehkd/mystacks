import React from 'react'
import { PageProps } from '@mystacks/types'
import { CustomAppBar } from '../components/app-bar/app-bar';
import { Box, styled } from '@mui/material';

/* eslint-disable-next-line */
export interface AccountPageProps extends PageProps {

}


export const AccountPage = (props: AccountPageProps) => {

    return (
    <CustomAppBar logoSize="sm" appState={props.appState}>
        <AccountInnerContainer>
          account
        </AccountInnerContainer>
      </CustomAppBar>
    )
}

export default AccountPage;

const AccountInnerContainer = styled(Box)(({ theme }) => ({
    margin: '20px 0 0 0',
  
    [theme.breakpoints.up('md')]: {
      margin: '50px 0 0 0',
    },
  }));