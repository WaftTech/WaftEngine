/*
 *
 * SignupPage actions
 *
 */
import action from 'utils/action';
import * as types from './constants';

export const signupRequest = action(types.SIGNUP_REQUEST, 'payload');
export const signupSuccess = action(types.SIGNUP_SUCCESS, 'payload');
export const signupFailure = action(types.SIGNUP_FAILURE, 'payload');
