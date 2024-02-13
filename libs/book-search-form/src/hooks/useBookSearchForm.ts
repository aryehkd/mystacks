import { useState, useEffect } from 'react'
import { request } from '@mystacks/utils'
import { Book } from '@mystacks/types'

export const useBookSearchForm = (navSearchQuery?: string) => {
    const [ inputValue, setInputValue ] = useState('')

    const [ formattedSearchResults, setFormattedSearchResults ] = useState<Book[]>([])

    useEffect(() => {
        if (navSearchQuery) {
            handleSearchClick(navSearchQuery)
            setInputValue(navSearchQuery)
        }
    }, [])

    const handleInputValueChange = (newInputValue: string) => {
        setInputValue(newInputValue)
    }

    const handleBookSeach = async (searchQuery: string): Promise<void | Book[]> => {
        console.log('searchQuery', searchQuery)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow' as RequestRedirect
          };
          
        const searchResults = await request("https://www.googleapis.com/books/v1/volumes?q="+searchQuery.replace("/ /g", "+"), requestOptions)
            .then(response => response.json())
            .then(result => formatBookSearchResults(result))
            .catch(error => console.log('error', error));

        return searchResults
    }

    const handleSearchClick = async (searchQuery: string) => {
        const searchResults = await handleBookSeach(searchQuery)
        if (searchResults) {
            setFormattedSearchResults(searchResults)
        }
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
        handleSearchClick,
        handleISBNSearch,
        formatBookSearchResults
    }
}

export default useBookSearchForm;