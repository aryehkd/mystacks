import React from 'react';
import { Meta } from '@storybook/react';
import CoverImage from './CoverImage';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

const CoverImageStory: React.FC = () => {
    const props = {
        imgUrl: "http://books.google.com/books/content?id=UDXpzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        alt: "Aliss at the Fire"
    }

    return (
        <CoverImage {...props}/>
    );
};

export default {
    title: 'Components/BookThumbnail',
    render: () => <CoverImageStory />,
    decorators: [StorybookThemeProvider],
} as Meta;

