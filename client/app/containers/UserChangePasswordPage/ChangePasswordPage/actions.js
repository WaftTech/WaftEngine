import * as types from './constants';

// export const setOneValue = payload => ({
//   type: types.SET_ONE_VALUE,
//   payload,
// });

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
