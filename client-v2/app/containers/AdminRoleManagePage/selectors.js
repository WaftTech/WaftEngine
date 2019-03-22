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

/**
 * Default selector used by AdminRoleManage
 */

const makeSelectAdminRoleManage = () =>
  createSelector(
    selectAdminRoleManageDomain,
    substate => substate,
  );

export default makeSelectAdminRoleManage;
