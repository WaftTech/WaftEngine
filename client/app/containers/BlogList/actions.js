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
export const setPagesValue = payload => ({
  type: types.SET_PAGES_VALUE,
  payload,
});

export const setSizeValue = payload => ({
  type: types.SET_SIZE_VALUE,
  payload,
});

export const loadBlogByAuthorRequest = payload => ({
  type: types.LOAD_BLOG_BY_AUTHOR_REQUEST,
  payload,
});
export const loadBlogByAuthorSuccess = payload => ({
  type: types.LOAD_BLOG_BY_AUTHOR_SUCCESS,
  payload,
});
export const loadBlogByAuthorFailure = payload => ({
  type: types.LOAD_BLOG_BY_AUTHOR_FAILURE,
  payload,
});
export const loadBlogByTagRequest = payload => ({
  type: types.LOAD_BLOG_BY_TAG_REQUEST,
  payload,
});
export const loadBlogByTagSuccess = payload => ({
  type: types.LOAD_BLOG_BY_TAG_SUCCESS,
  payload,
});
export const loadBlogByTagFailure = payload => ({
  type: types.LOAD_BLOG_BY_TAG_FAILURE,
  payload,
});
