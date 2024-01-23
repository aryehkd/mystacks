import { render } from '@testing-library/react';

import BookSearchForm from './book-search-form';
import { useBookSearchForm } from '@mystacks/book-search-form'


describe('BookSearchForm', () => {
  it('should render successfully', () => {
    const { inputValue, handleInputValueChange, search } = useBookSearchForm()

    const { baseElement } = render(
        <BookSearchForm 
          inputValue={inputValue} 
          handleInputValueChange={handleInputValueChange}
          search={search}
        />
    );
    expect(baseElement).toBeTruthy();
  });
});
