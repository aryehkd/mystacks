import { useState } from 'react'
import { request } from '@mystacks/utils'
import { AppStateType, Book } from '@mystacks/types'
import { useHookstate } from '@hookstate/core'

export const useSavedBooks = (appState:  AppStateType) => {
  const [ savedBooks, setSavedBooks ] = useState<Book[]>([])
  const globalState = useHookstate(appState);

  const loadSavedBooks = () => {
    const previousSavedBooks = globalState.get().books;
    previousSavedBooks && setSavedBooks(previousSavedBooks as Book[])

    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow' as RequestRedirect
      };
      const userId = globalState.get().userId
  
      if (!userId) throw new Error('no logged in user!');
  
      const url = "https://getstoredbooks-u6erzcpcda-uc.a.run.app?" + new URLSearchParams({
            userId: userId,
        })

      const handleSaveLoadedBooks = (updatedSavedBooks: Book[]) => {
        const diff: Book[] = []

        for (const book of updatedSavedBooks) {
          const found = savedBooks.find(savedBook => savedBook.id == book.id)
          
          if(!found) diff.push(book)
        }

        if (diff.length > 0) {
          const newSavedBooks = [...savedBooks, ...diff]
          setSavedBooks(newSavedBooks)
          globalState.set(currentState => {return {...currentState, books: newSavedBooks}})
        }
      }
      
      request(url, requestOptions)
          .then(response => response.json())
          .then(result => handleSaveLoadedBooks(result.data as Book[]))
          .catch(error => console.log('error', error));
    } catch (e) {
      console.error(e)
    }
  }

  const addSavedBook = (toAdd: Book) => {
    setSavedBooks([...savedBooks, toAdd])
  }

  return {
    savedBooks,
    addSavedBook,
    loadSavedBooks
  }
}