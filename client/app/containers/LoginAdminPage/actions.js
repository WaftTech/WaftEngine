/*
 *
 * LoginAdminPage actions
 *
 */

import * as types from './constants';

export const setValue = payload => ({
  type: types.SET_VALUE,
  payload,
});

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
export const clearStore = payload => ({ type: types.CLEAR_STORE, payload });

export const loginRequest = payload => ({ type: types.LOGIN_REQUEST, payload });
export const loginSuccess = payload => ({ type: types.LOGIN_SUCCESS, payload });
export const loginFailure = payload => ({ type: types.LOGIN_FAILURE, payload });

export const addTwoFactorRequest = payload => ({
  type: types.ADD_TWO_FACTOR_REQUEST,
  payload,
});
export const addTwoFactorSuccess = payload => ({
  type: types.ADD_TWO_FACTOR_SUCCESS,
  payload,
});
export const addTwoFactorFailure = payload => ({
  type: types.ADD_TWO_FACTOR_FAILURE,
  payload,
});
