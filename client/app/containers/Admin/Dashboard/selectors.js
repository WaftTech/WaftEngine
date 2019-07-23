import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminDashboard state domain
 */

export const selectDashboardDomain = state =>
  state.adminDashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

export const makeSelectErrors = () =>
  createSelector(
    selectDashboardDomain,
    state => state.errors,
  );
export const makeSelectUsers = () =>
  createSelector(
    selectDashboardDomain,
    state => state.users,
  );
export const makeSelectInfo = () =>
  createSelector(
    selectDashboardDomain,
    state => state.info,
  );

export const makeSelectBlog = () =>
  createSelector(
    selectDashboardDomain,
    state => state.blog,
  );
