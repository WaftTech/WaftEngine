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
