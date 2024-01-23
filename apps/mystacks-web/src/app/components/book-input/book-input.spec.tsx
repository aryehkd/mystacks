import { render } from '@testing-library/react';

import BookInput from './book-input';
import { useBookInput } from '@mystacks/book-input'


describe('BookInput', () => {
  it('should render successfully', () => {
    const { inputValue, handleInputValueChange, search } = useBookInput()

    const { baseElement } = render(
        <BookInput 
          inputValue={inputValue} 
          handleInputValueChange={handleInputValueChange}
          search={search}
        />
    );
    expect(baseElement).toBeTruthy();
  });
});
