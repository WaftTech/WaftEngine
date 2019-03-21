import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the contentsListingPage state domain
 */

const selectDomain = state => state.contentsListingPage || initialState;

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
export const makeSelectPage = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );
