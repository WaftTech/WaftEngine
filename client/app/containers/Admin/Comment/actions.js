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

export const approveRequest = payload => ({
  type: types.APPROVE_REQUEST,
  payload,
});
export const approveSuccess = payload => ({
  type: types.APPROVE_SUCCESS,
  payload,
});
export const approveFailure = payload => ({
  type: types.APPROVE_FAILURE,
  payload,
});

export const disapproveRequest = payload => ({
  type: types.DISAPPROVE_REQUEST,
  payload,
});
export const disapproveSuccess = payload => ({
  type: types.DISAPPROVE_SUCCESS,
  payload,
});
export const disapproveFailure = payload => ({
  type: types.DISAPPROVE_FAILURE,
  payload,
});
