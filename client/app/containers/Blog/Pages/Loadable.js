/**
 *
 * Asynchronously loads the component for BlogPage
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import Loading from 'components/Loading';

export const BlogList = loadable(() => import('./BlogList'), {
  fallback: <Loading />,
});
export const BlogDetail = loadable(() => import('./BlogDetail'), {
  fallback: <Loading />,
});

export const CategoryDetail = loadable(() => import('./CategoryDetail'), {
  fallback: <Loading />,
});
export const BlogDate = loadable(() => import('./BlogDate'), {
  fallback: <Loading />,
});
