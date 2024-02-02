import { useState } from 'react'
import { request } from '@mystacks/utils'
import { Book } from '@mystacks/types'

export const useBookSearchForm = () => {
    const [ inputValue, setInputValue ] = useState('')

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

    /* eslint-disable-next-line */ // TODO: fix type
    const formatBookSearchResults = (searchResults: any): Book[] => {
        if (searchResults?.items) { // TODO: need to handle multiple authors
            /* eslint-disable-next-line */
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

    return {
        inputValue,
        searchResults: formattedSearchResults,
        handleInputValueChange,
        handleBookSeach,
    }
}

export default useBookSearchForm;