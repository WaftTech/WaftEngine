/*
 * BlogPage Messages
 *
 * This contains all the text for the BlogPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  blogTitle: {
    id: 'app.containers.BlogPage.blogTitle',
    defaultMessage: 'Title',
  },
  blogContent: {
    id: 'app.containers.BlogPage.blogContent',
    defaultMessage: 'Description',
  },
  blogPublisher: {
    id: 'app.containers.BlogPage.blogPublisher',
    defaultMessage: 'Added By',
  },
  blogDate: {
    id: 'app.containers.BlogPage.blogDate',
    defaultMessage: 'Added at',
  }
});
