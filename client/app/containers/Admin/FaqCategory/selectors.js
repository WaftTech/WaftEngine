import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminFaqCategoryManagePage state domain
 */

const selectFaqCategoryDomain = state =>
  state.adminFaqCategoryManagePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FaqCategory
 */

export const makeSelectAll = () =>
  createSelector(
    selectFaqCategoryDomain,
    substate => substate.all,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectFaqCategoryDomain,
    substate => substate.query,
  );
export const makeSelectOne = () =>
  createSelector(
    selectFaqCategoryDomain,
    substate => substate.one,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectFaqCategoryDomain,
    substate => substate.loading,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectFaqCategoryDomain,
    state => state.errors,
  );
