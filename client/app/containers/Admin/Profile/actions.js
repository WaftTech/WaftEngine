import * as types from './constants';

export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});
export const setValue = payload => ({
  type: types.SET_VALUE,
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

export const changePasswordRequest = payload => ({
  type: types.CHANGE_PASSWORD_REQUEST,
  payload,
});
export const changePasswordSuccess = payload => ({
  type: types.CHANGE_PASSWORD_SUCCESS,
  payload,
});
export const changePasswordFailure = payload => ({
  type: types.CHANGE_PASSWORD_FAILURE,
  payload,
});

export const clearError = payload => ({
  type: types.CLEAR_ERROR,
  payload,
});

export const loadTwoFactorRequest = payload => ({
  type: types.LOAD_TWO_FACTOR_REQUEST,
  payload,
});
export const loadTwoFactorSuccess = payload => ({
  type: types.LOAD_TWO_FACTOR_SUCCESS,
  payload,
});
export const loadTwoFactorFailure = payload => ({
  type: types.LOAD_TWO_FACTOR_FAILURE,
  payload,
});

export const addTwoFactorRequest = payload => ({
  type: types.ADD_TWO_FACTOR_REQUEST,
  payload,
});
export const addTwoFactorSuccess = payload => ({
  type: types.ADD_TWO_FACTOR_SUCCESS,
  payload,
});
export const addTwoFactorFailure = payload => ({
  type: types.ADD_TWO_FACTOR_FAILURE,
  payload,
});
