import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.categoryDetailPage || initialState;

export const makeSelectBlog = () =>
  createSelector(
    selectDomain,
    state => state.blog,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );
