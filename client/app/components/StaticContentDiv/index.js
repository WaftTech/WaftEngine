/**
 *
 * Asynchronously loads the component for Breadcrumb
 *
 */

import React from 'react';
import loadable from 'utils/loadable';

export default loadable(() => import('./StaticContentDiv'), {
  fallback:  <div class="circlular_loader waftloader"></div>,
});
