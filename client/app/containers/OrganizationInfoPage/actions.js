/*
 *
 * OrganizationInfoPage actions
 *
 */

import * as types from './constants';

export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION,
  };
}

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

export const loadStateRequest = payload => ({
  type: types.LOAD_STATE_REQUEST,
  payload,
});
export const loadStateSuccess = payload => ({
  type: types.LOAD_STATE_SUCCESS,
  payload,
});
export const loadStateFailure = payload => ({
  type: types.LOAD_STATE_FAILURE,
  payload,
});

export const loadDistrictRequest = payload => ({
  type: types.LOAD_DISTRICT_REQUEST,
  payload,
});
export const loadDistrictSuccess = payload => ({
  type: types.LOAD_DISTRICT_SUCCESS,
  payload,
});
export const loadDistrictFailure = payload => ({
  type: types.LOAD_DISTRICT_FAILURE,
  payload,
});

export const loadVdcRequest = payload => ({
  type: types.LOAD_VDC_REQUEST,
  payload,
});
export const loadVdcSuccess = payload => ({
  type: types.LOAD_VDC_SUCCESS,
  payload,
});
export const loadVdcFailure = payload => ({
  type: types.LOAD_VDC_FAILURE,
  payload,
});
