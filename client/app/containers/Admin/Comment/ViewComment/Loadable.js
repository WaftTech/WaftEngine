/**
 *
 * Asynchronously loads the component for TransactionView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
