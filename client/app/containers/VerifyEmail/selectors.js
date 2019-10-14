import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the verifyEmail state domain
 */

export const selectDomain = state => state.verifyEmail || initialState;

/**
 * Other specific selectors
 */

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );
