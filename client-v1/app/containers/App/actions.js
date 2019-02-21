import * as types from './constants';

/**
 * sets the user
 *
 * @param  {object} user The userInfo
 *
 * @return {object}       An action object with a type of SET_USER passing the user
 */
export const setUser = payload => ({ type: types.SET_USER, payload });

/**
 * sets the token
 *
 * @param  {string} user The Authentication token
 *
 * @return {object}       An action object with a type of SET_TOKEN passing the token
 */
export const setToken = payload => ({ type: types.SET_TOKEN, payload });

/**
 * logs out user clears token in localstorage and resets app redux stores
 *
 * @return {object}       An action object with a type of SET_TOKEN passing the token
 */
export const logout = () => ({ type: types.LOGOUT });

export const subscribeRequest = payload => ({
  type: types.SUBSCRIBE_REQUEST,
  payload,
});
export const subscribeSuccess = payload => ({
  type: types.SUBSCRIBE_SUCCESS,
  payload,
});
export const subscribeFailure = payload => ({
  type: types.SUBSCRIBE_FAILURE,
  payload,
});

export const clearMessages = () => ({
  type: types.CLEAR_MESSAGES,
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

export const postMediaRequest = payload => ({
  type: types.POST_MEDIA_REQUEST,
  payload,
});
export const postMediaSuccess = payload => ({
  type: types.POST_MEDIA_SUCCESS,
  payload,
});
export const postMediaFailure = payload => ({
  type: types.POST_MEDIA_FAILURE,
  payload,
});
