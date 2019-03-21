/*
 *
 * AdsListingPage reducer
 *
 */

import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
  },
  one: {},
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.all.page = action.payload.page;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
    }
  });

export default reducer;
