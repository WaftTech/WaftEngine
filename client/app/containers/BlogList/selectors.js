import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.blogList || initialState;

export const makeSelectBlogList = () =>
  createSelector(
    selectDomain,
    state => state.blogList,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );
