import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminFaqCategoryManagePage state domain
 */

const selectAdminFaqCategoryManagePageDomain = state =>
  state.adminFaqCategoryManagePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminFaqCategoryManagePage
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminFaqCategoryManagePageDomain,
    substate => substate.all,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectAdminFaqCategoryManagePageDomain,
    substate => substate.query,
  );
export const makeSelectOne = () =>
  createSelector(
    selectAdminFaqCategoryManagePageDomain,
    substate => substate.one,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectAdminFaqCategoryManagePageDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectAdminFaqCategoryManagePageDomain,
    state => state.errors,
  );
