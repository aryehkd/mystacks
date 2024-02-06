import { useState, useEffect } from 'react';

export const useISBNField = (isbn: string, handleISBNChange: (newValue: string) => void) => {
    const [ editing, setEditing ] = useState(false);
    const [ tempISBN, setTempISBN ] = useState(isbn);

    const handleTempISBNChange = (newValue: string) => {
        setTempISBN(newValue)
    }

    const handleEditingChange = (newValue: boolean) => {
        setEditing(newValue)
    }

    const handleSaveClick = () => {
        handleISBNChange(tempISBN)
    }

    const handleCancelClick = () => {
        setEditing(false)
        setEditing(false)
    }

    useEffect(() => {
        if (editing) {
            setEditing(false)
        }
    }, [isbn])

    return {
        editing,
        tempISBN,
        handleSaveClick,
        handleCancelClick,
        handleTempISBNChange,
        handleEditingChange
    };
};
