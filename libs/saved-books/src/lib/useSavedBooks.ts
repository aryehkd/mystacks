import { useState } from 'react'
import { request } from '@mystacks/utils'
import { AppStateType, Book } from '@mystacks/types'
import { useHookstate } from '@hookstate/core'

export const useSavedBooks = (appState:  AppStateType) => {
  const [ savedBooks, setSavedBooks ] = useState<Book[]>([])
  const globalState = useHookstate(appState);

  const loadSavedBooks = () => {
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
      
      request(url, requestOptions)
          .then(response => response.json())
          .then(result => setSavedBooks(result.data as Book[]))
          .catch(error => console.log('error', error));
    } catch (e) {
      console.error(e)
    }
  }

  const addSavedBook = (toAdd: Book) => {
    setSavedBooks([...savedBooks, toAdd])
  }

  console.log(savedBooks)

  return {
    savedBooks,
    addSavedBook,
    loadSavedBooks
  }
}