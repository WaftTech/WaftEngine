import * as types from './constants';

export const loadVideoLibraryListRequest = payload => ({
  type: types.LOAD_VIDEOLIBRARY_LIST_REQUEST,
  payload,
});
export const loadVideoLibraryListSuccess = payload => ({
  type: types.LOAD_VIDEOLIBRARY_LIST_SUCCESS,
  payload,
});
export const loadVideoLibraryListFailure = payload => ({
  type: types.LOAD_VIDEOLIBRARY_LIST_FAILURE,
  payload,
});
