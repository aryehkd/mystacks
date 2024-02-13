import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

import { StorybookThemeProvider } from '../../../../.storybook/decorators/storybook-theme-provider'
import { BookSearch } from './book-search';

export const BookSearchStory = () => {

  return (
    <BookSearch 

    />
  )
}

export default {
  title: 'BookSearchStory',
  render: () => <BookSearchStory />,
  decorators: [withRouter, StorybookThemeProvider],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/login' },
    }),
  },
};