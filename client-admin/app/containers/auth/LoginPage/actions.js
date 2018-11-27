/*
 *
 * LoginPage actions
 *
 */
import action from 'utils/action';
import * as types from './constants';

export const loginRequest = action(types.LOGIN_REQUEST, 'payload', 'redirect');
export const loginSuccess = action(types.LOGIN_SUCCESS, 'payload');
export const loginFailure = action(types.LOGIN_FAILURE, 'payload');

export const resetPasswordRequest = action(
  types.RESET_PASSWORD_REQUEST,
  'payload',
);
export const resetPasswordSuccess = action(
  types.RESET_PASSWORD_SUCCESS,
  'payload',
);
export const resetPasswordFailure = action(
  types.RESET_PASSWORD_FAILURE,
  'payload',
);
