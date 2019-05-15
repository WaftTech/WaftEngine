/*
 *
 * AdminDashboard actions
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
