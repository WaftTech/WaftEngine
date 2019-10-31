import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editorFileSelect state domain
 */

export const selectDomain = state => state.editorFileSelect || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );
