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

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    state => state.folderOne,
  );
export const makeSelectfolderAddRequest = () =>
  createSelector(
    selectDomain,
    state => state.folderAddRequest,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );
