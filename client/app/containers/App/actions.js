/*
 *
 * App actions
 *
 */

import * as types from './constants';

export const setUser = user => ({
  type: types.SET_USER,
  payload: user,
});

export const setToken = token => ({
  type: types.SET_TOKEN,
  payload: token,
});
export const enqueueSnackbar = notification => ({
  type: types.ENQUEUE_SNACKBAR,
  payload: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});
export const removeSnackbar = payload => ({
  type: types.REMOVE_SNACKBAR,
  payload,
});

export const logoutRequest = payload => ({
  type: types.LOGOUT_REQUEST,
  payload,
});
export const logoutSuccess = payload => ({
  type: types.LOGOUT_SUCCESS,
  payload,
});
export const logoutFailure = payload => ({
  type: types.LOGOUT_FAILURE,
  payload,
});

export const loadContentRequest = payload => ({
  type: types.LOAD_CONTENT_REQUEST,
  payload,
});
export const loadContentSuccess = payload => ({
  type: types.LOAD_CONTENT_SUCCESS,
  payload,
});
export const loadContentFailure = payload => ({
  type: types.LOAD_CONTENT_FAILURE,
  payload,
});

export const loadMediaRequest = payload => ({
  type: types.LOAD_MEDIA_REQUEST,
  payload,
});
export const loadMediaSuccess = payload => ({
  type: types.LOAD_MEDIA_SUCCESS,
  payload,
});
export const loadMediaFailure = payload => ({
  type: types.LOAD_MEDIA_FAILURE,
  payload,
});

export const loadSlideRequest = payload => ({
  type: types.LOAD_SLIDE_REQUEST,
  payload,
});
export const loadSlideSuccess = payload => ({
  type: types.LOAD_SLIDE_SUCCESS,
  payload,
});
export const loadSlideFailure = payload => ({
  type: types.LOAD_SLIDE_FAILURE,
  payload,
});
export const availableRequest = payload => ({
  type: types.LOAD_AVAILABLE_REQUEST,
  payload,
});
export const availableSuccess = payload => ({
  type: types.LOAD_AVAILABLE_SUCCESS,
  payload,
});
export const availableFailure = payload => ({
  type: types.LOAD_AVAILABLE_FAILURE,
  payload,
});
