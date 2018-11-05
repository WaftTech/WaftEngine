/*
 *
 * LoginForm actions
 *
 */

import * as types from './constants';

export const loginRequest = () => ({ type: types.LOGIN_REQUEST });
export const loginSuccess = payload => ({ type: types.LOGIN_SUCCESS, payload });
export const loginFailure = payload => ({ type: types.LOGIN_FAILURE, payload });

export const changeHandler = (payload, metadata) => ({
  type: types.CHANGE_HANDLER,
  payload,
  metadata,
});
