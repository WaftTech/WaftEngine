/**
 *
 * Asynchronously loads the component for Dashboard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
