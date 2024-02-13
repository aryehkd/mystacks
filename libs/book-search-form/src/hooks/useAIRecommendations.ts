import { useState, useEffect } from 'react';
import { request } from '@mystacks/utils'
import { AppStateType, Book, AIRecommendation } from '@mystacks/types';
import { useBookSearchForm } from './useBookSearchForm';
import { useSavedBooks } from '@mystacks/saved-books';


export const useAIRecommendations = (appState: AppStateType) => {
    const [inputBooks, setInputBooks] = useState<Book[]>([]);
    const [recommendedBooks, setRecommendedBooks] = useState<AIRecommendation[]>([]);

    const { handleBookSeach } = useBookSearchForm();
    const { savedBooks, loadSavedBooks } = useSavedBooks(appState);

    useEffect(() => {loadSavedBooks()}, [])

    const handleInputBookChange = (books: Book[]) => {
        setInputBooks(books);
    }

    const formatInputBooks = (books: Book[]): {title: string, author: string}[] => {
        return books.map(book => {
            return {
                title: book.bookInfo.title,
                author: book.bookInfo.author
            }
        })
    }

    const handleRecommendationOutput = async (recommendation: string) => {
        const recommendations = await formatRecommendedBooks(recommendation)
        console.log('recommendations', recommendations)
        setRecommendedBooks(recommendations)
    }

    const formatRecommendedBooks = async (aiRecommendation: string): Promise<AIRecommendation[]> => {
        if (aiRecommendation) {
            const recJSON = JSON.parse(aiRecommendation)

            const recommendations = await Promise.all([
                handleBookSeach(recJSON[0].title + " " + recJSON[0].author),
                handleBookSeach(recJSON[1].title + " " + recJSON[1].author),
                handleBookSeach(recJSON[2].title + " " + recJSON[2].author),
            ] as Promise<Book[]>[]);

            return [
                {...recommendations[0][0], recommendation: recJSON[0].description}, 
                {...recommendations[1][0], recommendation: recJSON[1].description}, 
                {...recommendations[2][0], recommendation: recJSON[2].description}
            ]
        }
        return []
    }

    const loadAIRecommendationsTerms = (books: Book[]) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "books": [
                    ...formatInputBooks(books)
                ]
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow' as RequestRedirect
            };
      
            const url = "https://getairecommendations-u6erzcpcda-uc.a.run.app"
            
            request(url, requestOptions)
                .then(response => response.json())
                .then(result => handleRecommendationOutput(result.data))
                .catch(error => console.log('error', error));
        } catch (e) {
          console.error(e)
        }
    }    

    return {
        inputBooks,
        recommendedBooks,
        savedBooks,
        handleInputBookChange,
        loadAIRecommendationsTerms,
        setInputBooks,
    }
};

export default useAIRecommendations;