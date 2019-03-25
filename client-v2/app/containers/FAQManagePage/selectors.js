import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the faqManagePage state domain
 */

const selectDomain = state => state.faqManagePage || initialState;

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );
export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    state => state.one,
  );
export const makeSelectCategory = () =>
  createSelector(
    selectDomain,
    state => state.category,
  );
