import { useState } from 'react'
import { request } from '@mystacks/utils'

export const useBookSearchForm = () => {
    const [ inputValue, setInputValue ] = useState('')

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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return {
        inputValue,
        handleInputValueChange,
        handleBookSeach
    }
}

export default useBookSearchForm;