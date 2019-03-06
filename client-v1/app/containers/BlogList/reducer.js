import { fromJS } from 'immutable';

import * as types from './constants';

// The initial state of the App
export const initialState = fromJS({
  blogList: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BLOG_LIST_SUCCESS:
      return state.merge({
        blogList: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default reducer;
