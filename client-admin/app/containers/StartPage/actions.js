/*
 *
 * StartPage actions
 *
 */
import action from 'utils/action';
import * as types from './constants';

export const findUserRequest = action(types.FIND_USER_REQUEST, 'payload');
export const findUserSuccess = action(types.FIND_USER_SUCCESS, 'payload');
export const findUserFailure = action(types.FIND_USER_FAILURE, 'payload');
