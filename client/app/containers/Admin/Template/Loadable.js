/**
 *
 * Asynchronously loads the component for Template
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
