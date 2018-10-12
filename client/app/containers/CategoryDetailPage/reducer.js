/*
 *
 * CategoryDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  category: {},
});

function categoryDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CATEGORY_SUCCESS:
      return state;
    default:
      return state;
  }
}

export default categoryDetailPageReducer;
