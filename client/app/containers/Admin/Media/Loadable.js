/**
 *
 * Asynchronously loads the component for Media
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
