/*
 * Testimonial Messages
 *
 * This contains all the text for the Testimonial container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Testimonial';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Testimonial container!',
  },
});
