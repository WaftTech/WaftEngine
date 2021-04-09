/**
 *
 * Asynchronously loads the component for Breadcrumb
 *
 */

import React from 'react';
import loadable from 'utils/loadable';

export default loadable(() => import('./StaticContentDiv'), {
  fallback: <div className="circular_loader waftloader"></div>,
});
