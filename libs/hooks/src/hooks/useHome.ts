import { AppStateType, Book, BookProgressStates, HomeLoadingStates, HomeLoadingState } from '@mystacks/types';
import { useEffect, useState } from 'react';
import { useSavedBooks } from './useSavedBooks';

export const useHome = (appState: AppStateType) => {
    const [ loadedBooks, setLoadedBooks ] = useState<Book[]>([])

   const [ loadingState, setLoadingState ] = useState<HomeLoadingState>(HomeLoadingStates.LoadNotStarted)
   const [  currentShelfTab, setCurrentShelfTab ] = useState(0);

   const { savedBooks, loadSavedBooks } = useSavedBooks(appState)

   const addCurrentlyReadingHomepageStaggered = () => {
        let added = 0

        const addNextBook = () => {
            const currentlyReading = savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading)

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
        const currentlyReading = savedBooks.filter(book => book?.userRating?.bookProgress == BookProgressStates.CurrentlyReading)

        setLoadedBooks(currentlyReading.slice(0, 5))
        setLoadingState(HomeLoadingStates.LoadComplete)
    }

    const getCurrentMonth = () => {
        const today = new Date();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return month[today.getMonth()]
    }

    const addHeadline = (typewriter: boolean) => {
        const heading = `it's ${getCurrentMonth()}...`
        const subHeading = "and this is what you're reading"

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

   useEffect(() => {
        const storedFirstLoadComplete = window.sessionStorage.getItem("storedFirstLoadComplete")   

        if (storedFirstLoadComplete !== "true") initFirstLoad()
        else initRegularLoad()

        loadSavedBooks()
    }, [])

    useEffect(() => {
        if (loadingState == HomeLoadingStates.LoadingFirstTimeBooks && savedBooks.length && loadedBooks.length == 0) {
            setTimeout(() => addCurrentlyReadingHomepageStaggered(), 1000);
        }
        if (loadingState == HomeLoadingStates.LoadingRegular && savedBooks.length && loadedBooks.length == 0) {
            addCurrentlyReadingHomepageAll()
        }
    }, [savedBooks, loadingState])

    return {
        currentShelfTab,
        savedBooks,
        loadedBooks,
        loadingState,
        handleTabChange,
        tabA11yProps
    }
};

export default useHome;