import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminDashboard state domain
 */

export const selectAdminDashboardDomain = state =>
  state.adminDashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminDashboard
 */

export const makeSelectErrors = () =>
  createSelector(
    selectAdminDashboardDomain,
    state => state.errors,
  );
export const makeSelectUsers = () =>
  createSelector(
    selectAdminDashboardDomain,
    state => state.users,
  );
