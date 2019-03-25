/*
 *
 * SignupUserPage actions
 *
 */

import * as types from './constants';

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
export const clearStore = payload => ({ type: types.CLEAR_STORE, payload });

export const signupRequest = payload => ({
  type: types.SIGNUP_REQUEST,
  payload,
});
export const signupSuccess = payload => ({
  type: types.SIGNUP_SUCCESS,
  payload,
});
export const signupFailure = payload => ({
  type: types.SIGNUP_FAILURE,
  payload,
});

export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION,
  };
}
