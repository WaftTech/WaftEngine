import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  category: {},
  blog: { blog: [], category: [] },
});

function categoryDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CATEGORY_SUCCESS:
      return state.merge({
        category: fromJS(action.payload.data),
      });
    case types.LOAD_BLOG_SUCCESS:
      return state.merge({
        blog: fromJS(action.payload.data || { blog: [], category: [] }),
      });
    default:
      return state;
  }
}

export default categoryDetailPageReducer;
