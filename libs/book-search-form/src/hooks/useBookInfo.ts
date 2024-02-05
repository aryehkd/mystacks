import { useState } from 'react'
import { request } from '@mystacks/utils'
import { Book, BookProgressStates, BookProgressState, BookRating } from '@mystacks/types'
import { useHookstate } from '@hookstate/core'
import { useNavigate } from 'react-router-dom'
import { AppStateType } from '@mystacks/types'

export const useBookInfo = (book: Book, appState:  AppStateType) => {
    const globalState = useHookstate(appState);
    const navigate = useNavigate();

    const [ bookProgress, setBookProgress ] = useState<BookProgressState>(book.bookProgress || BookProgressStates.ToRead)
    const [ rating, setRating ] = useState<BookRating>(book.rating || 0)
    const [ notes, setNotes ] = useState<string>(book.notes || '')

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

    const handlesNotesChange = (
        newNotes: string,
      ) => {
        setNotes(newNotes);
    };

    const saveBook = () => {
        try {
            const userId = globalState.get().userId

            if (!userId) throw new Error('no logged in user!');
            
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            const raw = JSON.stringify({
                "book": {
                    "title": book.title,
                    "author": book.author,
                    "imgUrl": book.imgUrl,
                    "bookProgress": bookProgress,
                    "rating": rating,
                    "notes": notes
                }
            });
    
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow' as RequestRedirect
            };
            
            const url = "https://storebook-u6erzcpcda-uc.a.run.app?" + new URLSearchParams({
                userId: userId,
            })
              
            request(url, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
    
                    navigate('/')
                    // navigate back home
                })
                .catch(error => console.log('error', error));
        } catch (e) {
            console.error(e)
        }
        
    }

    return {
        bookProgress,
        rating,
        notes,
        handleBookProgressChange,
        handleBookRatingChange,
        handlesNotesChange,
        saveBook
    }
}

export default useBookInfo;