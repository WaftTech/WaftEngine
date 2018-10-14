/*
 *
 * CategoryDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  category: {},
  organization: [],
});

function categoryDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CATEGORY_SUCCESS:
      return state.merge({
        category: fromJS(action.payload.data.category),
        organization: fromJS(action.payload.data.organization),
      });
    default:
      return state;
  }
}

export default categoryDetailPageReducer;
