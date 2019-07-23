import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminRole state domain
 */

export const selectAdminRoleDomain = state =>
  state.adminRole || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminRoleDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAdminRoleDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAdminRoleDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAdminRoleDomain,
    substate => substate.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectAdminRoleDomain,
    state => state.errors,
  );

/**
 * Default selector used by AdminRole
 */

const makeSelectAdminRole = () =>
  createSelector(
    selectAdminRoleDomain,
    substate => substate,
  );

export default makeSelectAdminRole;
