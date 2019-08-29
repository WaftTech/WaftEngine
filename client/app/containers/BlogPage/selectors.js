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

export const makeSelectArchives = () =>
  createSelector(
    selectDomain,
    state => state.archives,
  );

export const makeSelectRecentBlogsIsLoading = () =>
  createSelector(
    selectDomain,
    state => state.recentBlogsIsLoading,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    state => state.one,
  );

export const makeSelectComment = () =>
  createSelector(
    selectDomain,
    state => state.comments,
  );

export const makeSelectArchivesIsLoading = () =>
  createSelector(
    selectDomain,
    state => state.archivesIsLoading,
  );
