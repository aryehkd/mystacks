import { useState } from 'react'
import { request } from '@mystacks/utils'
import { Book } from '@mystacks/types'

export const useBookSearchForm = (addSavedBook?: (toAdd: Book) => void) => {
    const [ inputValue, setInputValue ] = useState('')
    const [ bookSearchError, setBookSearchError ] = useState(false)

    const [ formattedSearchResults, setFormattedSearchResults ] = useState<Book[]>([])

    const handleInputValueChange = (newInputValue: string) => {
        setInputValue(newInputValue)
    }

    const handleBookSeach = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow' as RequestRedirect
          };
          
        request("https://www.googleapis.com/books/v1/volumes?q="+inputValue.replaceAll(" ", "+"), requestOptions)
            .then(response => response.json())
            .then(result => formatBookSearchResults(result))
            .then(result => setFormattedSearchResults(result))
            .catch(error => console.log('error', error));
    }

    const formatBookSearchResults = (searchResults: any): Book[] => {
        if (searchResults?.items) { // TODO: need to handle multiple authors
            const formattedResults = searchResults.items.map((result: any) => {
                return {
                    title: result.volumeInfo.title, 
                    author: result.volumeInfo?.authors?.[0]??"",
                    imgUrl: result.volumeInfo?.imageLinks?.thumbnail??""
                }
            })

            return formattedResults;
        }

        // TODO: API error state 
        return []
    }

    const saveBook = (toSave: Book) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "book": {
                "title": toSave.title,
                "author": toSave.author,
                "imgUrl": toSave.imgUrl
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
                addSavedBook?.(toSave)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    return {
        inputValue,
        searchResults: formattedSearchResults,
        handleInputValueChange,
        handleBookSeach,
        saveBook
    }
}

export default useBookSearchForm;