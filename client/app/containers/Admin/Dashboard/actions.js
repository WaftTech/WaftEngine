/*
 *
 * Dashboard actions
 *
 */

import * as types from './constants';

export const loadUserRequest = payload => ({
  type: types.LOAD_USER_REQUEST,
  payload,
});

export const loadUserSuccess = payload => ({
  type: types.LOAD_USER_SUCCESS,
  payload,
});

export const loadUserFailure = payload => ({
  type: types.LOAD_USER_FAILURE,
  payload,
});
export const loadErrorRequest = payload => ({
  type: types.LOAD_ERROR_REQUEST,
  payload,
});
export const loadErrorSuccess = payload => ({
  type: types.LOAD_ERROR_SUCCESS,
  payload,
});
export const loadErrorFailure = payload => ({
  type: types.LOAD_ERROR_FAILURE,
  payload,
});
export const loadInfoRequest = payload => ({
  type: types.LOAD_INFO_REQUEST,
  payload,
});
export const loadInfoSuccess = payload => ({
  type: types.LOAD_INFO_SUCCESS,
  payload,
});
export const loadInfoFailure = payload => ({
  type: types.LOAD_INFO_FAILURE,
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
