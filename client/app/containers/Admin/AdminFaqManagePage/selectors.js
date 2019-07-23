import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the faqManagePage state domain
 */

export const selectFaqManagePageDomain = state =>
  state.faqManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectFaqManagePageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectFaqManagePageDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectFaqManagePageDomain,
    substate => substate.query,
  );

export const makeSelectCategory = () =>
  createSelector(
    selectFaqManagePageDomain,
    state => state.category,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectFaqManagePageDomain,
    state => state.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectFaqManagePageDomain,
    state => state.errors,
  );

/**
 * Default selector used by FaqManagePage
 */

const makeSelectFaqManagePage = () =>
  createSelector(
    selectFaqManagePageDomain,
    substate => substate,
  );

export default makeSelectFaqManagePage;
