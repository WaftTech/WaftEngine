/*
 *
 * SubscriberPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  email: '',
  success: false,
  successMsg: '',
  errors: {},
};

/* eslint-disable default-case, no-param-reassign */
const subscriberPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_STORE_VALUE:
        draft[action.payload.key] = action.payload.value;
        break;
      case types.SAVE_SUBSCRIBER_SUCCESS:
        draft.errors = initialState.errors;
        draft.success = true;
        draft.successMsg = action.payload.msg;
        break;
      case types.SAVE_SUBSCRIBER_FAILURE:
        draft.errors = { ...action.payload.errors };
        draft.successMsg = initialState.successMsg;
        break;
    }
  });

export default subscriberPageReducer;
