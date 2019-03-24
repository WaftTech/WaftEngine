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

/**
 * Default selector used by AdminUserManagePage
 */

const makeSelectAdminUserManagePage = () =>
  createSelector(
    selectAdminUserManagePageDomain,
    substate => substate,
  );

export default makeSelectAdminUserManagePage;
