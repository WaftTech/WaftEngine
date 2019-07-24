/**
 *
 * Asynchronously loads the component for BlogCategory
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
