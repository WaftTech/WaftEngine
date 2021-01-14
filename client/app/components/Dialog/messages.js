/*
 * Dialog Messages
 *
 * This contains all the text for the Dialog component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Dialog';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Dialog component!',
  },
});
