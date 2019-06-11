import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminRoleManage state domain
 */

export const selectAdminRoleManageDomain = state =>
  state.adminRoleManage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminRoleManageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAdminRoleManageDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAdminRoleManageDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAdminRoleManageDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by AdminRoleManage
 */

const makeSelectAdminRoleManage = () =>
  createSelector(
    selectAdminRoleManageDomain,
    substate => substate,
  );

export default makeSelectAdminRoleManage;
