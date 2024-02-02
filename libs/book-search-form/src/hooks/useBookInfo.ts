import { useState } from 'react'
import { request } from '@mystacks/utils'
import { Book, BookProgressStates, BookProgressState, BookRating } from '@mystacks/types'

export const useBookInfo = (book: Book) => {
    const [ bookProgress, setBookProgress ] = useState<BookProgressState>(BookProgressStates.ToRead)
    const [ rating, setRating ] = useState<BookRating>(0)

    const handleBookProgressChange = (
        newBookProgressState: BookProgressState,
      ) => {
        setBookProgress(newBookProgressState);
    };

    const handleBookRatingChange = (
        newBookRating: BookRating,
      ) => {
        setRating(newBookRating);
    };

    const saveBook = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "book": {
                "title": book.title,
                "author": book.author,
                "imgUrl": book.imgUrl,
                "bookProgress": bookProgress,
                "rating": rating
            }
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow' as RequestRedirect
        };
          
          
        request("https://storebook-u6erzcpcda-uc.a.run.app", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)

                // navigate back home
            })
            .catch(error => console.log('error', error));
    }

    return {
        bookProgress,
        rating,
        handleBookProgressChange,
        handleBookRatingChange,
        saveBook
    }
}

export default useBookInfo;