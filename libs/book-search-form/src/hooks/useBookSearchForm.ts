import { useState } from 'react'

export const useBookSearchForm = () => {
    const [ inputValue, setInputValue ] = useState('')

    const handleInputValueChange = (newInputValue: string) => {
        setInputValue(newInputValue)
    }

    const search = () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        fetch("https://www.googleapis.com/books/v1/volumes?q="+inputValue.replaceAll(" ", "+"), requestOptions as any)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return {
        inputValue,
        handleInputValueChange,
        search
    }
}

export default useBookSearchForm;