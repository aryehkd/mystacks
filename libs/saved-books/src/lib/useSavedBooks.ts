import { useEffect, useState } from 'react'
import { request } from '@mystacks/utils'
import { Book } from '@mystacks/types'

export const useSavedBooks = () => {
  const [ savedBooks, setSavedBooks ] = useState<Book[]>([])

  const loadSavedBooks = () => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow' as RequestRedirect
      };
      
    request("https://getstoredbooks-u6erzcpcda-uc.a.run.app", requestOptions)
        .then(response => response.json())
        .then(result => setSavedBooks(result.data as Book[]))
        .catch(error => console.log('error', error));
  }

  const addSavedBook = (toAdd: Book) => {
    setSavedBooks([...savedBooks, toAdd])
  }

  useEffect(() => {
    loadSavedBooks()
  }, [])

  return {
    savedBooks,
    addSavedBook
  }
}