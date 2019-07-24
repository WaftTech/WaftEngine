import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.blogPage || initialState;

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

export const makeSelectRelatedBlogs = () =>
  createSelector(
    selectDomain,
    state => state.relatedBlogs,
  );

export const makeSelectRelatedBlogsIsLoading = () =>
  createSelector(
    selectDomain,
    state => state.relatedBlogsIsLoading,
  );

export const makeSelectRecentBlogs = () =>
  createSelector(
    selectDomain,
    state => state.recentBlogs,
  );

export const makeSelectRecentBlogsIsLoading = () =>
  createSelector(
    selectDomain,
    state => state.recentBlogsIsLoading,
  );
