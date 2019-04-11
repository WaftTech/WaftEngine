/*
 *
 * SubscriberPage actions
 *
 */

import * as types from './constants';

export const setStoreValue = payload => ({
  type: types.SET_STORE_VALUE,
  payload,
});
export const saveSubscriberRequest = payload => ({
  type: types.SAVE_SUBSCRIBER_REQUEST,
  payload,
});
export const saveSubscriberSuccess = payload => ({
  type: types.SAVE_SUBSCRIBER_SUCCESS,
  payload,
});
export const saveSubscriberFailure = payload => ({
  type: types.SAVE_SUBSCRIBER_FAILURE,
  payload,
});
