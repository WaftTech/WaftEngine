/**
 *
 * Asynchronously loads the component for Module
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
