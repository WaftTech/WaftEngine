import * as types from './constants';

export const loadErrorRequest = payload => ({
  type: types.LOAD_ERROR_REQUEST,
  payload,
});
export const loadErrorSuccess = payload => ({
  type: types.LOAD_ERROR_SUCCESS,
  payload,
});
export const loadErrorFailure = payload => ({
  type: types.LOAD_ERROR_FAILURE,
  payload,
});
// export const deleteOneRequest = payload => ({
//   type: types.DELETE_ONE_REQUEST,
//   payload,
// });
// export const deleteOneSuccess = payload => ({
//   type: types.DELETE_ONE_SUCCESS,
//   payload,
// });
// export const deleteOneFailure = payload => ({
//   type: types.DELETE_ONE_FAILURE,
//   payload,
// });
