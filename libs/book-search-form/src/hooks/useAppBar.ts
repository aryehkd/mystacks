import { useState, useEffect } from 'react';
import { AppStateType, BookSearchItem } from '@mystacks/types'
import { useHookstate } from '@hookstate/core'
import { request } from '@mystacks/utils'
import { useNavigate } from 'react-router-dom'
import { matchSorter } from 'match-sorter';
import { text } from 'stream/consumers';


export const useAppBar = (appState:  AppStateType) => {
    const navigate = useNavigate();
    const [ textFieldValue, setTextFieldValue ] = useState<string>('')

    // TODO: move this to hookstate so it only loads once
    const [ searchItems, setSearchItems ] = useState<BookSearchItem[]>([])
    const globalState = useHookstate(appState);

    const loadSeachTerms = () => {
        try {
          const requestOptions = {
            method: 'GET',
            redirect: 'follow' as RequestRedirect
          };
          const userId = globalState.get().userId
      
          if (!userId) throw new Error('no logged in user!');
      
          const url = "https://getstoredbookssearchkeys-u6erzcpcda-uc.a.run.app?" + new URLSearchParams({
                userId: userId,
            })
          
          request(url, requestOptions)
              .then(response => response.json())
              .then(result => setSearchItems(result.data as BookSearchItem[]))
              .catch(error => console.log('error', error));
        } catch (e) {
          console.error(e)
        }
    }

    const customSearchFilter = (options: string[], state: {inputValue: string}) => {
        console.log('state', options, state)

        if (state.inputValue === "") return []

        options = matchSorter(options, state.inputValue)

        // first term is always "search new book"
        return ["Search New Book", ...options]
    }

    const handleHomeClick = () => {
        navigate('/');
    } 

    const handleNewSearchClick = () => {
        navigate('/search', {state: {navSearchQuery: textFieldValue}});
    } 

    const handleSearchClick = (newSearchValue: string|null) => {
        const selectedBook = searchItems.find((item: BookSearchItem) => item.title+" by "+item.author === newSearchValue)
        if (selectedBook) {
            navigate('/book-info', {state: {bookId: selectedBook.id}})
        }
    } 

    const handleTextFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.target.value)
    }

    const handleSearchFieldSelect = (newSearchValue: string | null) => {

        if (newSearchValue === "Search New Book") {
            handleNewSearchClick()
        } else {
            handleSearchClick(newSearchValue)
        }
    }

    useEffect(() => {
        loadSeachTerms()
    }, [])

    return {
        searchItems,
        handleHomeClick,
        customSearchFilter,
        handleTextFieldValueChange,
        handleSearchFieldSelect
    };
};

export default useAppBar;