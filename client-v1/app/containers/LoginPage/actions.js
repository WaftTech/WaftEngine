/*
*
* LoginPage actions
*
*/

import * as types from './constants';

export const defaultAction = payload => ({
  type: types.DEFAULT_ACTION,
  payload,
});

export const setUsername = payload => ({
  type: types.SET_USERNAME,
  payload,
});

export const setPassword = payload => ({
  type: types.SET_PASSWORD,
  payload,
});

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
