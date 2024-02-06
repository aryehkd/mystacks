import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { ISBNField } from './isbn-field';
import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'

export const ISBNFieldStory = () => {

  const [isbn, setIsbn] = React.useState('971972942')

  const handleISBNChange = (newValue: string) => {setIsbn(newValue)}

  return (
    <StoryContainer>
      <ISBNField isbn={isbn} handleISBNChange={handleISBNChange}/>
    </StoryContainer>
  )
}

export default {
  title: 'ISBN Field',
  render: () => <ISBNFieldStory />,
  decorators: [StorybookThemeProvider],
};

const StoryContainer = styled(Box)(({ theme }) => ({
  width: "100%",
}));
