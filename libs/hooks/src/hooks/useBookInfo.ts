import { useEffect, useState } from 'react';
import { request } from '@mystacks/utils';
import {
  Book,
  BookProgressStates,
  BookProgressState,
  BookRating,
} from '@mystacks/types';
import { useHookstate } from '@hookstate/core';
import { useNavigate } from 'react-router-dom';
import { AppStateType } from '@mystacks/types';
import useBookSearchForm from './useBookSearchForm';
import dayjs, { Dayjs } from 'dayjs';

export const useBookInfo = (
  appState: AppStateType,
  book?: Book,
  bookId?: string
) => {
  const globalState = useHookstate(appState);
  const navigate = useNavigate();
  const { handleISBNSearch } = useBookSearchForm();

  const [currentBook, setCurrentBook] = useState<Book | undefined>(book);
  const [bookProgress, setBookProgress] = useState<BookProgressState>(
    book?.userRating?.bookProgress || BookProgressStates.ToRead
  );
  const [rating, setRating] = useState<BookRating>(
    book?.userRating?.rating || 0
  );
  const [notes, setNotes] = useState<string>(book?.userRating?.notes || '');
  const [isbn, setISBN] = useState<string>(
    book?.bookInfo?.industryIdentifiers?.isbn13 ||
      book?.bookInfo?.industryIdentifiers?.isbn10 ||
      ''
  );
  const [isbnError, setISBNError] = useState<string | undefined>(undefined);
  const [completedDate, setCompletedDate] = useState<Dayjs | null>(dayjs());

  const [loading, setLoading] = useState<boolean>(false);
  const [bookLoaded, setBookLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (book) {
      setCurrentBook(book);
      setBookLoaded(true);
    } else if (bookId) {
      loadBook(bookId);
    }
  }, []);

  const loadBook = (bookId: string) => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow' as RequestRedirect,
      };
      const userId = globalState.get().userId;

      if (!userId) throw new Error('no logged in user!');

      const url =
        'https://getstoredbook-u6erzcpcda-uc.a.run.app?' +
        new URLSearchParams({
          userId: userId,
          bookId: bookId,
        });

      request(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const loadedBook = result.data as Book;
          setCurrentBook(loadedBook);
          setBookProgress(
            loadedBook.userRating?.bookProgress || BookProgressStates.ToRead
          );
          setRating(loadedBook.userRating?.rating || 0);
          setNotes(loadedBook.userRating?.notes || '');
          setISBN(
            loadedBook.bookInfo?.industryIdentifiers?.isbn13 ||
              loadedBook.bookInfo?.industryIdentifiers?.isbn10 ||
              ''
          );
          setBookLoaded(true);
        })
        .catch(
          (error) => console.log('error', error) // TODO: add handling here to display not found
        );
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookProgressChange = (
    newBookProgressState: BookProgressState
  ) => {
    setBookProgress(newBookProgressState);
  };

  const handleBookRatingChange = (newBookRating: BookRating) => {
    setRating(newBookRating);
  };

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
  };

  const handleCompletedDateChange = (newDate: Dayjs | null) => {
    setCompletedDate(newDate);
  };

  const searchNewISBN = async (newISBN: string) => {
    const result = await handleISBNSearch(newISBN);

    if (result) {
      setCurrentBook({ ...(currentBook as Book), bookInfo: result.bookInfo });
    }
    console.log('result', result);
  };

  const handleISBNChange = (newISBN: string) => {
    try {
      if (newISBN.length !== 10 && newISBN.length !== 13)
        throw new Error('invalid isbn');

      setISBN(newISBN);
      searchNewISBN(newISBN);
      setISBNError(undefined);
    } catch (error) {
      setISBNError('Invalid ISBN');
      console.error(error);
    }
  };

  const saveBook = () => {
    try {
      setLoading(true);
      const userId = globalState.get().userId;

      if (!userId) throw new Error('no logged in user!');

      if (!book) throw new Error('no book loaded!');

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const isbnKey = isbn.length === 10 ? 'isbn10' : 'isbn13';

      const industryIdentifiers = {
        ...book?.bookInfo.industryIdentifiers,
        [isbnKey]: isbn,
      };

      const raw = JSON.stringify({
        book: {
          id: book.id,
          bookInfo: {
            ...book.bookInfo,
            industryIdentifiers: {
              ...industryIdentifiers,
            },
          },
          userRating: {
            bookProgress: bookProgress,
            rating: rating,
            notes: notes,
          },
        },
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect,
      };

      const url =
        'https://storebook-u6erzcpcda-uc.a.run.app?' +
        new URLSearchParams({
          userId: userId,
        });

      request(url, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);

          navigate('/');
          setLoading(false);
          // navigate back home
        })
        .catch((error) => console.log('error', error));
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return {
    currentBook,
    bookProgress,
    rating,
    notes,
    isbn,
    isbnError,
    loading,
    completedDate,
    bookLoaded,
    handleBookProgressChange,
    handleBookRatingChange,
    handleNotesChange,
    saveBook,
    handleISBNChange,
    handleCompletedDateChange,
  };
};

export default useBookInfo;
