/*
 *
 * Testimonial actions
 *
 */

import * as types from './constants';

export const loadAllRequest = payload => ({
  type: types.LOAD_ALL_REQUEST,
  payload,
});
export const loadAllSuccess = payload => ({
  type: types.LOAD_ALL_SUCCESS,
  payload,
});
export const loadAllFailure = payload => ({
  type: types.LOAD_ALL_FAILURE,
  payload,
});

export const loadOneRequest = payload => ({
  type: types.LOAD_ONE_REQUEST,
  payload,
});
export const loadOneSuccess = payload => ({
  type: types.LOAD_ONE_SUCCESS,
  payload,
});
export const loadOneFailure = payload => ({
  type: types.LOAD_ONE_FAILURE,
  payload,
});

export const addEditRequest = payload => ({
  type: types.ADD_EDIT_REQUEST,
  payload,
});
export const addEditSuccess = payload => ({
  type: types.ADD_EDIT_SUCCESS,
  payload,
});
export const addEditFailure = payload => ({
  type: types.ADD_EDIT_FAILURE,
  payload,
});

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const setQueryValue = payload => ({
  type: types.SET_QUERY_VALUE,
  payload,
});
export const clearErrors = payload => ({
  type: types.CLEAR_ERRORS,
  payload,
});
export const clearQuery = payload => ({
  type: types.CLEAR_QUERY,
  payload,
});
export const clearOne = payload => ({
  type: types.CLEAR_ONE,
  payload,
});
export const deleteOneRequest = payload => ({
  type: types.DELETE_ONE_REQUEST,
  payload,
});
export const deleteOneSuccess = payload => ({
  type: types.DELETE_ONE_SUCCESS,
  payload,
});
export const deleteOneFailure = payload => ({
  type: types.DELETE_ONE_FAILURE,
  payload,
});

export const addFromMedia = payload => ({
  type: types.ADD_FROM_MEDIA,
  payload,
});

export const sliderSettingChange = payload => ({
  type: types.SLIDER_SETTING_CHANGE,
  payload,
});
export const sliderSettingRequest = payload => ({
  type: types.SLIDER_SETTING_REQUEST,
  payload,
});
export const sliderSettingSuccess = payload => ({
  type: types.SLIDER_SETTING_SUCCESS,
  payload,
});
export const sliderSettingFailure = payload => ({
  type: types.SLIDER_SETTING_FAILURE,
  payload,
});
export const loadSliderSettingRequest = payload => ({
  type: types.LOAD_SLIDER_SETTING_REQUEST,
  payload,
});
export const loadSliderSettingSuccess = payload => ({
  type: types.LOAD_SLIDER_SETTING_SUCCESS,
  payload,
});
export const loadSliderSettingFailure = payload => ({
  type: types.LOAD_SLIDER_SETTING_FAILURE,
  payload,
});
export const openPopUp = payload => ({
  type: types.OPEN_POPUP,
  payload,
});
export const closePopUp = payload => ({
  type: types.CLOSE_POPUP,
  payload,
});