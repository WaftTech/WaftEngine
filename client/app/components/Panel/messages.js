/*
 * Panel Messages
 *
 * This contains all the text for the Panel component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Panel';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Panel component!',
  },
});
