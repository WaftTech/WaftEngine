import * as types from './constants';

export const loadVideosRequest = payload => ({
  type: types.LOAD_VIDEOS_REQUEST,
  payload,
});
export const loadVideosSuccess = payload => ({
  type: types.LOAD_VIDEOS_SUCCESS,
  payload,
});
export const loadVideosFailure = payload => ({
  type: types.LOAD_VIDEOS_FAILURE,
  payload,
});
