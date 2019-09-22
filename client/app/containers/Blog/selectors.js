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

export const makeSelectArchiveLoading = () =>
  createSelector(
    selectDomain,
    state => state.archiveLoading,
  );

export const makeSelectBlogList = () =>
  createSelector(
    selectDomain,
    state => state.blogList,
  );

export const makeSelectBlogByAuthor = () =>
  createSelector(
    selectDomain,
    state => state.blogByAuthor,
  );

export const makeSelectBlogByTag = () =>
  createSelector(
    selectDomain,
    state => state.blogByTag,
  );

export const makeSelectBlogDate = () =>
  createSelector(
    selectDomain,
    state => state.blogDate,
  );

export const makeSelectDateLoading = () =>
  createSelector(
    selectDomain,
    state => state.dateLoading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    state => state.query,
  );

export const makeSelectCategory = () =>
  createSelector(
    selectDomain,
    state => state.category,
  );

export const makeSelectCategoryLoading = () =>
  createSelector(
    selectDomain,
    state => state.catLoading,
  );

export const makeSelectBlogOfCat = () =>
  createSelector(
    selectDomain,
    state => state.blogOfCat,
  );

export const makeSelectLoadingBlogOfCat = () =>
  createSelector(
    selectDomain,
    state => state.loadingBlogOfCat,
  );
export const makeSelectCategoryTitle = () =>
  createSelector(
    selectDomain,
    state => state.categoryTitle,
  );
