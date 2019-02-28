/*
*
* CodeVerifyPage actions
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
export const submitRequest = payload => ({
  type: types.SUBMIT_REQUEST,
  payload,
});
export const submitSuccess = payload => ({
  type: types.SUBMIT_SUCCESS,
  payload,
});
export const submitFailure = payload => ({
  type: types.SUBMIT_FAILURE,
  payload,
});
