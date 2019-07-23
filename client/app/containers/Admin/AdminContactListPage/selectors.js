import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminContactListPage state domain
 */

export const selectAdminContactListPageDomain = state =>
  state.adminContactListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminContactListPage
 */
export const makeSelectAll = () =>
  createSelector(
    selectAdminContactListPageDomain,
    state => state.all,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectAdminContactListPageDomain,
    state => state.query,
  );
export const makeSelectOne = () =>
  createSelector(
    selectAdminContactListPageDomain,
    state => state.one,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAdminContactListPageDomain,
    state => state.loading,
  );
