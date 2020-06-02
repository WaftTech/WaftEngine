/*
 *
 * SettingsManagePage actions
 *
 */

import * as types from './constants';

export const loadAllSettingsRequest = payload => ({
  type: types.LOAD_ALL_SETTINGS_REQUEST,
  payload,
});
export const loadAllSettingsSuccess = payload => ({
  type: types.LOAD_ALL_SETTINGS_SUCCESS,
  payload,
});
export const loadAllSettingsFailure = payload => ({
  type: types.LOAD_ALL_SETTINGS_FAILURE,
  payload,
});
export const setValue = payload => ({
  type: types.SET_VALUE,
  payload,
});

export const editSettingsRequest = payload => ({
  type: types.EDIT_SETTINGS_REQUEST,
  payload,
});
export const editSettingsSuccess = payload => ({
  type: types.EDIT_SETTINGS_SUCCESS,
  payload,
});
export const editSettingsFailure = payload => ({
  type: types.EDIT_SETTINGS_FAILURE,
  payload,
});

export const sendTestMailRequest = payload => ({
  type: types.SEND_TEST_MAIL_REQUEST,
  payload,
});
export const sendTestMailSuccess = payload => ({
  type: types.SEND_TEST_MAIL_SUCCESS,
  payload,
});
export const sendTestMailFailure = payload => ({
  type: types.SEND_TEST_MAIL_FAILURE,
  payload,
});
