import { fromJS } from 'immutable';

import * as types from './constants';

// The initial state of the App
export const initialState = fromJS({
  videoLibraryList: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_VIDEOLIBRARY_LIST_SUCCESS:
      return state.merge({
        videoLibraryList: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default reducer;
