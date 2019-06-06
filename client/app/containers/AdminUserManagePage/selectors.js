import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminUserManagePage state domain
 */

export const selectAdminUserManagePageDomain = state =>
  state.adminUserManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminUserManagePageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAdminUserManagePageDomain,
    substate => substate.one,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAdminUserManagePageDomain,
    state => state.loading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAdminUserManagePageDomain,
    state => state.query,
  );

/**
 * Default selector used by AdminUserManagePage
 */

const makeSelectAdminUserManagePage = () =>
  createSelector(
    selectAdminUserManagePageDomain,
    substate => substate,
  );

export default makeSelectAdminUserManagePage;
