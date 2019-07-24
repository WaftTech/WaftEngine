import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the faqManagePage state domain
 */

export const selectFaqPageDomain = state =>
  state.faqManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectFaqPageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectFaqPageDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectFaqPageDomain,
    substate => substate.query,
  );

export const makeSelectCategory = () =>
  createSelector(
    selectFaqPageDomain,
    state => state.category,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectFaqPageDomain,
    state => state.loading,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectFaqPageDomain,
    state => state.errors,
  );

/**
 * Default selector used by FaqPage
 */

const makeSelectFaqPage = () =>
  createSelector(
    selectFaqPageDomain,
    substate => substate,
  );

export default makeSelectFaqPage;
