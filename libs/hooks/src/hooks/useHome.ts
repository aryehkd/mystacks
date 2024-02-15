import { AppStateType, Book, BookProgressStates } from '@mystacks/types';
import { useEffect, useState } from 'react';
import { useSavedBooks } from './useSavedBooks';

export const useHome = (appState: AppStateType) => {
    const [ ready, setReady ] = useState(false)
    const [ loadedBooks, setLoadedBooks ] = useState<Book[]>([])

   // TODO: these need to be reading session storage once books get saved between loads
   const [ firstLoad, setFirstLoad ] = useState(true)
   const [ firstLoadComplete, setFirstLoadComplete ] = useState(false)
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
                setFirstLoadComplete(true)
                window.sessionStorage.setItem('firstLoadComplete', 'true')
            }
        }

        addNextBook()
    }

    const getCurrentMonth = () => {
        const today = new Date();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return month[today.getMonth()]
    }

    const typewriter = () => {
        const pt1 = `it's ${getCurrentMonth()}...`
        const pt2 = "and this is what you're reading"

        let index1 = 1
        let index2 = 1

        const destination = document.getElementById("typedtext");
        const destination2 = document.getElementById("typedtext2");
        if (!destination || !destination2) return;

        destination.innerHTML = ''
        destination2.innerHTML = ''
        
        const write = () => {
            if (index1 <= pt1.length) {
                destination.innerHTML = pt1.substring(0, index1)
                index1 += 1
                if (index1 > pt1.length) setTimeout(() => write(), 1000)
                else setTimeout(() => write(), 100);
            } else if (index2 <= pt2.length) {
                destination2.innerHTML = pt2.substring(0, index2)
                index2 += 1
                setTimeout(() => write(), 40);
            } else {
                setReady(true)
            }     
        }

        setTimeout(() => write(), 100);

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
        firstLoad && typewriter()
        setFirstLoad(false)

        loadSavedBooks()
    }, [])

    useEffect(() => {
        if (savedBooks.length && ready == true && loadedBooks.length == 0) {
            setTimeout(() => addCurrentlyReadingHomepageStaggered(), 1000);
        }
    }, [savedBooks, ready])

    return {
        currentShelfTab,
        savedBooks,
        loadedBooks,
        firstLoadComplete,
        handleTabChange,
        tabA11yProps
    }
};

export default useHome;