/*
*
* AboutUs actions
*
*/

import * as types from './constants';

export const loadAboutUsRequest = payload => ({
  type: types.LOAD_ABOUT_US_REQUEST,
  payload,
});
export const loadAboutUsSuccess = payload => ({
  type: types.LOAD_ABOUT_US_SUCCESS,
  payload,
});
export const loadAboutUsFailure = payload => ({
  type: types.LOAD_ABOUT_US_FAILURE,
  payload,
});
