import * as types from './constants';

export const loadVideoDetailRequest = payload => ({
  type: types.LOAD_VIDEODETAIL_REQUEST,
  payload,
});
export const loadVideoDetailSuccess = payload => ({
  type: types.LOAD_VIDEODETAIL_SUCCESS,
  payload,
});
export const loadVideoDetailFailure = payload => ({
  type: types.LOAD_VIDEODETAIL_FAILURE,
  payload,
});
