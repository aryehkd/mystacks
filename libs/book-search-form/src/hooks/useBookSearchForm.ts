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
          
        request("https://www.googleapis.com/books/v1/volumes?q="+inputValue.replace("/ /g", "+"), requestOptions)
            .then(response => response.json())
            .then(result => formatBookSearchResults(result))
            .then(result => setFormattedSearchResults(result))
            .catch(error => console.log('error', error));
    }

    const handleISBNSearch = async (isbn: string): Promise<Book | undefined> => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow' as RequestRedirect
          };
          
        const result = await request("https://www.googleapis.com/books/v1/volumes?q=isbn:"+isbn, requestOptions)
            .then(response => response.json())
            .then(result => formatBookSearchResults(result))
            .catch(error => console.log('error', error));

        if (result && result.length > 0) {
            return result[0];
        }
        return undefined;
    }

    /* eslint-disable-next-line */ // TODO: fix type
    const formatBookSearchResults = (searchResults: any): Book[] => {
        if (searchResults?.items) { // TODO: need to handle multiple authors
            /* eslint-disable-next-line */
            const formattedResults = searchResults.items.map((result: any) => {
                return {
                    id: undefined,
                    savedDate: Date.now(),
                    bookInfo: {
                        title: result.volumeInfo.title, 
                        author: result.volumeInfo?.authors?.[0]??"",
                        imgUrl: result.volumeInfo?.imageLinks?.thumbnail??"",
                        industryIdentifiers: {
                            isbn13: result.volumeInfo.industryIdentifiers?.find((id: {type: string, identifier: string}) => id.type === "ISBN_13")?.identifier??"",
                            isbn10: result.volumeInfo.industryIdentifiers?.find((id: {type: string, identifier: string}) => id.type === "ISBN_10")?.identifier??"",
                        },
                        publisher: result.volumeInfo.publisher,
                        publishedDate: result.volumeInfo.publishedDate,
                        pageCount: result.volumeInfo.pageCount,
                    },
                }
            })

            console.log(formattedResults)

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
        handleISBNSearch,
    }
}

export default useBookSearchForm;