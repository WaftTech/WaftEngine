import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offerManagePage state domain
 */

const selectDomain = state => state.blogManagePage || initialState;

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
export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    state => state.query,
  );
export const makeSelectChip = () =>
  createSelector(
    selectDomain,
    state => state.chipData,
  );
export const makeSelectTag = () =>
  createSelector(
    selectDomain,
    state => state.tempTag,
  );
