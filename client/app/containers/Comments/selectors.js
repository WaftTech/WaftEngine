import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the comments state domain
 */

export const selectDomain = state => state.comments || initialState;

/**
 * Default selector used by Comments
 */

export const makeSelectComment = () =>
  createSelector(
    selectDomain,
    state => state.comments,
  );
export const makeSelectCommentLoading = () =>
  createSelector(
    selectDomain,
    state => state.commentLoading,
  );
export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    state => state.one,
  );
