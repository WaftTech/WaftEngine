import * as types from './constants';

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

export const loadRelatedBlogsRequest = payload => ({
  type: types.LOAD_RELATED_BLOGS_REQUEST,
  payload,
});
export const loadRelatedBlogsSuccess = payload => ({
  type: types.LOAD_RELATED_BLOGS_SUCCESS,
  payload,
});
export const loadRelatedBlogsFailure = payload => ({
  type: types.LOAD_RELATED_BLOGS_FAILURE,
  payload,
});

export const loadRecentBlogsRequest = payload => ({
  type: types.LOAD_RECENT_BLOGS_REQUEST,
  payload,
});
export const loadRecentBlogsSuccess = payload => ({
  type: types.LOAD_RECENT_BLOGS_SUCCESS,
  payload,
});
export const loadRecentBlogsFailure = payload => ({
  type: types.LOAD_RECENT_BLOGS_FAILURE,
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
