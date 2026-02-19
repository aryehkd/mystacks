import { AppStateType, Book, BookProgressStates, HomeLoadingStates, HomeLoadingState } from '@mystacks/types';
import { useEffect, useState } from 'react';
import { useSavedBooks } from './useSavedBooks';
import dayjs from 'dayjs';
import { useHookstate } from '@hookstate/core';

export const useHome = (appState: AppStateType) => {
    const [ loadedBooks, setLoadedBooks ] = useState<Book[]>([])
    const globalState = useHookstate(appState);
    const booksFromGlobal = globalState.books.get();

   const [ loadingState, setLoadingState ] = useState<HomeLoadingState>(HomeLoadingStates.LoadNotStarted)
   const [  currentShelfTab, setCurrentShelfTab ] = useState(0);

   const { savedBooks, loadSavedBooks } = useSavedBooks(appState)

   const booksToUse = (booksFromGlobal && booksFromGlobal.length > 0) ? booksFromGlobal : savedBooks;

   const addCurrentlyReadingHomepageStaggered = () => {
        let added = 0
        const source = booksToUse

        const addNextBook = () => {
            const currentlyReading = source.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading)

            if (currentlyReading.length > added) {
                setLoadedBooks(currentlyReading.slice(0, added + 1))
                added += 1

                setTimeout(() => addNextBook(), 1000);
            }
            else {
                setLoadingState(HomeLoadingStates.LoadComplete)
                window.sessionStorage.setItem('storedFirstLoadComplete', 'true')
            }
        }

        addNextBook()
    }

    const addCurrentlyReadingHomepageAll = () => {
        const currentlyReading = booksToUse.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading)

        setLoadedBooks(currentlyReading.slice(0, 5))
        setLoadingState(HomeLoadingStates.LoadComplete)
    }

    const getCurrentMonth = () => {
        const today = new Date();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return month[today.getMonth()]
    }

    const getBooksReadThisYear = () => {
        const today = new Date();
        const year = today.getFullYear();
        const booksReadThisYear = booksToUse.filter(book => book?.userRating?.bookProgress == BookProgressStates.Completed && book?.userRating?.completedDate && dayjs.unix(book.userRating.completedDate).year() == year)
        return booksReadThisYear.length
    }

    const addHeadline = (typewriter: boolean) => {
        const firstLogin = globalState.get()?.firstLogin ?? false
        const heading = firstLogin ? "Welcome to the stacks" : `it's ${getCurrentMonth()}...`
        const subHeading = firstLogin ? "Add your first book from the search bar" : "and this is what you're reading"

        const destination = document.getElementById("typedtext");
        const destination2 = document.getElementById("typedtext2");

        if (!destination || !destination2) return;

        destination.innerHTML = ''
        destination2.innerHTML = ''

        if (typewriter) {
            let indexHeading = 1
            let indexSubheading = 1
            
            const write = () => {
                if (indexHeading <= heading.length) {
                    destination.innerHTML = heading.substring(0, indexHeading)
                    indexHeading += 1
                    if (indexHeading > heading.length) setTimeout(() => write(), 1000)
                    else setTimeout(() => write(), 100);
                } else if (indexSubheading <= subHeading.length) {
                    destination2.innerHTML = subHeading.substring(0, indexSubheading)
                    indexSubheading += 1
                    setTimeout(() => write(), 40);
                } else {
                    if (firstLogin){
                        globalState.set(currentState => {return {...currentState, firstLogin: false}})
                        setLoadingState(HomeLoadingStates.LoadComplete)
                    }
                    else 
                        setLoadingState(HomeLoadingStates.LoadingFirstTimeBooks)
                }     
            }

            setTimeout(() => write(), 100);
        } else {
            destination.innerHTML = heading
            destination2.innerHTML = subHeading
        }

    }

    const initFirstLoad = () => {
        setLoadingState(HomeLoadingStates.LoadingFirstTimeText)
        addHeadline(true)
    }

    const initRegularLoad = () => {
        addHeadline(false)
        setLoadingState(HomeLoadingStates.LoadingRegular)
    }

    const tabA11yProps = (index: number) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentShelfTab(newValue);
    };

    const syncSavedAndLoadedBooks = () => {
        const sourceBooks = globalState.get().books ?? savedBooks;
        const tempLoadedBooks: Book[] = [...loadedBooks]
        let changed = 0

        for (const book of sourceBooks) {
            const foundIndex = tempLoadedBooks.findIndex((loadedBook) => loadedBook.id == book.id)
            
            if(foundIndex == -1 && book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading){
                tempLoadedBooks.push(book)
                changed = 1
            }
            if (foundIndex >= 0 && book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading) {
                if (tempLoadedBooks[foundIndex].userRating?.bookProgress != book.userRating?.bookProgress) {
                    tempLoadedBooks[foundIndex].userRating = book.userRating
                    changed = 1
                }
            }
            if (foundIndex >= 0 && tempLoadedBooks[foundIndex]?.userRating?.bookProgress == BookProgressStates.CurrentlyReading && book?.userRating?.bookProgress != BookProgressStates.CurrentlyReading) {
                tempLoadedBooks.splice(foundIndex, 1)
                changed = 1
            }
        }

        if (changed) {
            setLoadedBooks(tempLoadedBooks)
        }
    }

   useEffect(() => {
        const storedFirstLoadComplete = window.sessionStorage.getItem("storedFirstLoadComplete")   
        if (storedFirstLoadComplete !== "true") initFirstLoad()
        else initRegularLoad()

        loadSavedBooks()
    }, [])

    useEffect(() => {
        if (loadingState == HomeLoadingStates.LoadingFirstTimeBooks && booksToUse.length && loadedBooks.length == 0) {
            setTimeout(() => addCurrentlyReadingHomepageStaggered(), 1000);
        }
        if (loadingState == HomeLoadingStates.LoadingRegular && booksToUse.length && loadedBooks.length == 0) {
            addCurrentlyReadingHomepageAll()
        }

        if (loadingState == HomeLoadingStates.LoadComplete) {
            syncSavedAndLoadedBooks()
        }


    }, [savedBooks, loadingState, booksFromGlobal])

    return {
        currentShelfTab,
        savedBooks,
        loadedBooks,
        loadingState,
        handleTabChange,
        tabA11yProps,
        getBooksReadThisYear
    }
};

export default useHome;