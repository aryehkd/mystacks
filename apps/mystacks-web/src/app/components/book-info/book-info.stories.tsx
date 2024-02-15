import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import { BookInfo } from './book-info';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider';
import { useBookInfo } from '@mystacks/hooks';
import { AppStateType, BookProgressStates, BookRating } from '@mystacks/types';

export const BookInfoStory = () => {
  const book = {
    id: 'string,',
    savedDate: 123,
    bookInfo: {
      title: 'Aliss at the Fire',
      author: 'Jon Fosse',
      imgUrl:
        'http://books.google.com/books/content?id=UDXpzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      industryIdentifiers: {
        isbn13: '',
        isbn10: '',
      },
    },
    userRating: {
      rating: 5 as BookRating,
      notes: 'This is a great book',
      bookProgress: BookProgressStates.Completed,
    },
  };

  const bookInfoProps = useBookInfo(book, {} as AppStateType);

  return (
    <StoryContainer>
      <BookInfo book={book} {...bookInfoProps} />
    </StoryContainer>
  );
};

export default {
  title: 'Book Info',
  render: () => <BookInfoStory />,
  decorators: [withRouter, StorybookThemeProvider],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/login' },
    }),
  },
};

const StoryContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}));
