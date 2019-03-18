import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  category: {},
  blog: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
});

function categoryDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CATEGORY_SUCCESS:
      return state.merge({
        category: fromJS(action.payload.data),
      });
    case types.LOAD_BLOG_SUCCESS:
      return state.merge({
        blog: fromJS(action.payload),
      });
    default:
      return state;
  }
}

export default categoryDetailPageReducer;
