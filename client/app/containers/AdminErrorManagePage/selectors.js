import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminErrorManagePage state domain
 */

export const selectAdminErrorManagePageDomain = state =>
  state.adminErrorManagePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminErrorManagePage
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminErrorManagePageDomain,
    substate => substate.all,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectAdminErrorManagePageDomain,
    state => state.query,
  );
