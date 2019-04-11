/**
 *
 * Asynchronously loads the component for BlogPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
