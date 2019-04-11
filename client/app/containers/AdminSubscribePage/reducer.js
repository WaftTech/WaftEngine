/*
 *
 * AdminSubscribePage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {
    email: '',
    is_subscribed: '',
    added_at: '',
  },
  query: { find_email: '' },
};

/* eslint-disable default-case, no-param-reassign */
const adminSubscribePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_SUBSCRIBER_SUCCESS:
        draft.all = action.payload;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
    }
  });

export default adminSubscribePageReducer;
