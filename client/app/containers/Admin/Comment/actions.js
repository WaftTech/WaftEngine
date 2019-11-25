/*
 *
 * BlogCommentManagePage actions
 *
 */

import * as types from './constants';

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const loadAllRequest = payload => ({
  type: types.LOAD_ALL_REQUEST,
  payload,
});
export const loadAllSuccess = payload => ({
  type: types.LOAD_ALL_SUCCESS,
  payload,
});
export const loadAllFailure = payload => ({
  type: types.LOAD_ALL_FAILURE,
  payload,
});

export const getApprovedRequest = payload => ({
  type: types.GET_APPROVED_REQUEST,
  payload,
});
export const getApprovedSuccess = payload => ({
  type: types.GET_APPROVED_SUCCESS,
  payload,
});
export const getApprovedFailure = payload => ({
  type: types.GET_APPROVED_FAILURE,
  payload,
});

export const getDisapprovedRequest = payload => ({
  type: types.GET_DISAPPROVED_REQUEST,
  payload,
});
export const getDisapprovedSuccess = payload => ({
  type: types.GET_DISAPPROVED_SUCCESS,
  payload,
});
export const getDisapprovedFailure = payload => ({
  type: types.GET_DISAPPROVED_FAILURE,
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
export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const loadManageRequest = payload => ({
  type: types.LOAD_MANAGE_REQUEST,
  payload,
});
export const loadManageSuccess = payload => ({
  type: types.LOAD_MANAGE_SUCCESS,
  payload,
});
export const loadManageFailure = payload => ({
  type: types.LOAD_MANAGE_FAILURE,
  payload,
});
