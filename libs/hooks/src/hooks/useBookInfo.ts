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
  bookId?: string,
  lastPage?: string
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
  const [pageCount, setPageCount] = useState<number>(book?.bookInfo?.pageCount || 0);
  const [imageUrl, setImageUrl] = useState<string>(book?.bookInfo?.imgUrl || '');

  const [isbn, setISBN] = useState<string>(
    book?.bookInfo?.industryIdentifiers?.isbn13 ||
      book?.bookInfo?.industryIdentifiers?.isbn10 ||
      ''
  );
  const [isbnError, setISBNError] = useState<string | undefined>(undefined);
  const [completedDate, setCompletedDate] = useState<Dayjs | null>(dayjs());

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [bookLoaded, setBookLoaded] = useState<boolean>(false);

  const updateBookFields = (loadedBook: Book) => {
    setCurrentBook(loadedBook);
    setBookProgress(
      loadedBook.userRating?.bookProgress || BookProgressStates.ToRead
    );
    setRating(loadedBook.userRating?.rating || 0);
    setNotes(loadedBook.userRating?.notes || '');
    setPageCount(loadedBook.bookInfo?.pageCount || 0);
    setISBN(
      loadedBook.bookInfo?.industryIdentifiers?.isbn13 ||
        loadedBook.bookInfo?.industryIdentifiers?.isbn10 ||
        ''
    );
    setImageUrl(loadedBook.bookInfo?.imgUrl || '');
    setCompletedDate(
      loadedBook.userRating?.completedDate
        ? dayjs.unix(Number(loadedBook.userRating.completedDate))
        : dayjs()
    );
  }

  const resetBookState = () => {
    setBookLoaded(false);
    setCurrentBook(undefined);
    setBookProgress(BookProgressStates.ToRead);
    setRating(0);
    setNotes('');
    setPageCount(0);
    setISBN('');
    setImageUrl('');
    setCompletedDate(dayjs());
    setISBNError(undefined);
  }

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
          updateBookFields(result.data as Book)
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

  const handleImageURLChange = (newUrl: string) => {
    setImageUrl(newUrl);
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

      if (!currentBook) throw new Error('no book loaded!');

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const isbnKey = isbn.length === 10 ? 'isbn10' : 'isbn13';

      const industryIdentifiers = {
        ...currentBook?.bookInfo.industryIdentifiers,
        [isbnKey]: isbn,
      };

      const bookToSave: Book = {
        id: currentBook.id,
        savedDate: currentBook.savedDate,
        bookInfo: {
          ...currentBook.bookInfo,
          industryIdentifiers: {
            ...industryIdentifiers,
          },
          imgUrl: imageUrl,
          pageCount: pageCount,
        },
        userRating: {
          bookProgress: bookProgress,
          rating: rating,
          notes: notes,
          completedDate: completedDate?.unix() || 0,
        },
      }

      const raw = JSON.stringify({
        book: bookToSave
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
        .then((response) => response.json())
        .then((result) => {

          if (result?.error) throw new Error(result?.error)
          else {
              console.log('book stored successfully', result.data.account)
          }

          globalState.merge((state) => {
            if (!state.books) return state;
            const bookIndex = state.books.findIndex(
              (book) => book.id === (currentBook?.id ?? result?.data?.bookId)
            );

            if (bookIndex !== -1) {
              state.books[bookIndex] = bookToSave;
            } else {
              state.books.push(bookToSave);
            }
            return state
          });

          resetBookState();
          lastPage ? navigate(lastPage) : navigate('/');
          setLoading(false);
          // navigate back home
        })
        .catch((error) => console.log('error', error));
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const deleteBook = () => {
    const userId = globalState.get().userId;
    const bookIdToDelete = currentBook?.id;

    if (!userId || !bookIdToDelete) return;

    setDeleteLoading(true);
    const url = `https://deletebook-u6erzcpcda-uc.a.run.app?${new URLSearchParams({ userId, bookId: bookIdToDelete })}`;

    request(url, { method: 'GET' })
      .then((res) => {
        if (!res.ok) return res.json().then((data) => Promise.reject(data));
        return res.json();
      })
      .then(() => {
        globalState.set((state) => {
          if (!state.books || !Array.isArray(state.books)) return state;
          return {
            ...state,
            books: state.books.filter((b: Book) => b.id !== bookIdToDelete),
          };
        });
        resetBookState();
        navigate(lastPage || '/shelf');
      })
      .catch((err) => {
        console.error('deleteBook failed', err);
        setDeleteLoading(false);
      });
  };

  // When navigating to a different book, reset and load so we never show stale data
  const bookKey = bookId ?? book?.id ?? (book ? `unsaved-${book?.bookInfo?.title}` : null);
  useEffect(() => {
    if (!bookKey) return;

    resetBookState();

    const allSavedBooks = globalState.get().books;
    const foundBook =
      allSavedBooks?.find((savedBook) => savedBook.id == bookId) || book;
    if (foundBook) {
      updateBookFields(foundBook);
      setBookLoaded(true);
    } else if (bookId) {
      loadBook(bookId);
    } else if (book) {
      updateBookFields(book);
      setBookLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- bookKey intentionally stabilizes identity; full deps would reset on every parent re-render
  }, [bookKey]);

  return {
    currentBook,
    bookProgress,
    imageUrl,
    rating,
    notes,
    isbn,
    isbnError,
    loading,
    deleteLoading,
    completedDate,
    bookLoaded,
    handleBookProgressChange,
    handleBookRatingChange,
    handleNotesChange,
    saveBook,
    deleteBook,
    handleISBNChange,
    handleCompletedDateChange,
    handleImageURLChange
  };
};

export default useBookInfo;
