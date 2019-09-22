/*
 *
 * Comments actions
 *
 */

import * as types from './constants';

export const loadCommentRequest = payload => ({
  type: types.LOAD_COMMENT_REQUEST,
  payload,
});
export const loadCommentSuccess = payload => ({
  type: types.LOAD_COMMENT_SUCCESS,
  payload,
});
export const loadCommentFailure = payload => ({
  type: types.LOAD_COMMENT_FAILURE,
  payload,
});
export const postCommentRequest = payload => ({
  type: types.POST_COMMENT_REQUEST,
  payload,
});
export const postCommentSuccess = payload => ({
  type: types.POST_COMMENT_SUCCESS,
  payload,
});
export const postCommentFailure = payload => ({
  type: types.POST_COMMENT_FAILURE,
  payload,
});
export const editCommentSuccess = payload => ({
  type: types.EDIT_COMMENT_SUCCESS,
  payload,
});

export const deleteCommentRequest = payload => ({
  type: types.DELETE_COMMENT_REQUEST,
  payload,
});
export const deleteCommentSuccess = payload => ({
  type: types.DELETE_COMMENT_SUCCESS,
  payload,
});
export const deleteCommentFailure = payload => ({
  type: types.DELETE_COMMENT_FAILURE,
  payload,
});
export const loadOneRequest = payload => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = payload => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = payload => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});
export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const clearOne = () => ({
  type: types.CLEAR_ONE,
});
