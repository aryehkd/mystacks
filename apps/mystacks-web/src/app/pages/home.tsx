import React from 'react'
import { PageProps } from '@mystacks/types'
import { BookSearch } from '../components/book-search/book-search';

/* eslint-disable-next-line */
export interface HomePageProps extends PageProps {

}

export const HomePage = (props: HomePageProps) => {

    return (
        <BookSearch />
    )
}

export default HomePage;