/*
 *
 * SettingsManagePage actions
 *
 */

import * as types from './constants';

export const defaultActionRequest = payload => ({
  type: types.DEFAULT_ACTION_REQUEST,
  payload,
});
export const defaultActionSuccess = payload => ({
  type: types.DEFAULT_ACTION_SUCCESS,
  payload,
});
export const defaultActionFailure = payload => ({
  type: types.DEFAULT_ACTION_FAILURE,
  payload,
});
