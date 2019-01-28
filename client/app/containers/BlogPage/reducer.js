import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  blog: {},
});

function blogPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_BLOG_SUCCESS:
      return state.merge({
        blog: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default blogPageReducer;
