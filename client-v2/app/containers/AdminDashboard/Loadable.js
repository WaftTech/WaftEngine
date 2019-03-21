/**
 *
 * Asynchronously loads the component for AdminDashboard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
