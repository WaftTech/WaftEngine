import * as types from './constants';

export const loadFourorgRequest = payload => ({
  type: types.LOAD_FOURORG_REQUEST,
  payload,
});
export const loadFourorgSuccess = payload => ({
  type: types.LOAD_FOURORG_SUCCESS,
  payload,
});
export const loadFourorgFailure = payload => ({
  type: types.LOAD_FOURORG_FAILURE,
  payload,
});

export const loadOrgRequest = payload => ({
  type: types.LOAD_ORG_REQUEST,
  payload,
});
export const loadOrgSuccess = payload => ({
  type: types.LOAD_ORG_SUCCESS,
  payload,
});
export const loadOrgFailure = payload => ({
  type: types.LOAD_ORG_FAILURE,
  payload,
});
