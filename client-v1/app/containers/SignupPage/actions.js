/*
*
* SignupPage actions
*
*/

import * as types from './constants';

export const defaultAction = payload => ({
  type: types.DEFAULT_ACTION,
  payload,
});
export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
export const setGenderValue = payload => ({
  type: types.SET_GENDER_VALUE,
  payload,
});

export const signupRequest = payload => ({ type: types.SIGNUP_REQUEST, payload });
export const signupSuccess = payload => ({ type: types.SIGNUP_SUCCESS, payload });
export const signupFailure = payload => ({ type: types.SIGNUP_FAILURE, payload });
