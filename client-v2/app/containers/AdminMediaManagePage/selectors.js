import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminMediaManagePage state domain
 */

export const selectAdminMediaManagePageDomain = state =>
  state.adminMediaManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminMediaManagePageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAdminMediaManagePageDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAdminMediaManagePageDomain,
    substate => substate.query,
  );

/**
 * Default selector used by AdminMediaManagePage
 */

const makeSelectAdminMediaManagePage = () =>
  createSelector(
    selectAdminMediaManagePageDomain,
    substate => substate,
  );

export default makeSelectAdminMediaManagePage;
