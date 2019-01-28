import * as types from './constants';

export const loadCategoryRequest = payload => ({
  type: types.LOAD_CATEGORY_REQUEST,
  payload,
});
export const loadCategorySuccess = payload => ({
  type: types.LOAD_CATEGORY_SUCCESS,
  payload,
});
export const loadCategoryFailure = payload => ({
  type: types.LOAD_CATEGORY_FAILURE,
  payload,
});

export const loadBlogRequest = payload => ({
  type: types.LOAD_BLOG_REQUEST,
  payload,
});
export const loadBlogSuccess = payload => ({
  type: types.LOAD_BLOG_SUCCESS,
  payload,
});
export const loadBlogFailure = payload => ({
  type: types.LOAD_BLOG_FAILURE,
  payload,
});
