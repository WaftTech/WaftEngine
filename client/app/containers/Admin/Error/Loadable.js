/**
 *
 * Asynchronously loads the component for Error
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
