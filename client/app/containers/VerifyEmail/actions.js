/*
 *
 * VerifyEmail actions
 *
 */

import * as types from './constants';

export const loadVerifyEmailRequest = payload => ({
  type: types.LOAD_VERIFY_EMAIL_REQUEST,
  payload,
});
export const loadVerifyEmailSuccess = payload => ({
  type: types.LOAD_VERIFY_EMAIL_SUCCESS,
  payload,
});
export const loadVerifyEmailFailure = payload => ({
  type: types.LOAD_VERIFY_EMAIL_FAILURE,
  payload,
});
