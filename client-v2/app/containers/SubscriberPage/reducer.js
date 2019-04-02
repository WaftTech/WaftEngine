/*
 *
 * SubscriberPAge reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  email: '',
};

/* eslint-disable default-case, no-param-reassign */
const subscriberPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_STORE_VALUE:
        draft[action.payload.key] = action.payload.value;
        break;
    }
  });

export default subscriberPageReducer;
