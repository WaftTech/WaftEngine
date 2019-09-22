/**
 *
 * Asynchronously loads the component for BlogPage
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import Loading from 'components/Loading';

export const Informtions = loadable(() => import('./Information'), {
  fallback: <Loading />,
});
export const ChangePasswords = loadable(() => import('./ChangePassword'), {
  fallback: <Loading />,
});
