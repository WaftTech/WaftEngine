import * as types from './constants';

export const loadBlogListRequest = payload => ({
  type: types.LOAD_BLOG_LIST_REQUEST,
  payload,
});
export const loadBlogListSuccess = payload => ({
  type: types.LOAD_BLOG_LIST_SUCCESS,
  payload,
});
export const loadBlogListFailure = payload => ({
  type: types.LOAD_BLOG_LIST_FAILURE,
  payload,
});
