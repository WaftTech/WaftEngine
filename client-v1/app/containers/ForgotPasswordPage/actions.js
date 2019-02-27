/*
*
* ForgotPasswordPage actions
*
*/

import * as types from './constants';

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
export const clearStore = payload => ({
  type: types.CLEAR_STORE,
  payload,
});
export const passwordResetRequest = payload => ({
  type: types.PASSWORD_RESET_REQUEST,
  payload,
});
export const passwordResetSuccess = payload => ({
  type: types.PASSWORD_RESET_SUCCESS,
  payload,
});
export const passwordResetFailure = payload => ({
  type: types.PASSWORD_RESET_FAILURE,
  payload,
});
