/*
 *
 * StartPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  isRequesting: false,
  errors: {},
});

function startPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FIND_USER_REQUEST:
      return state.merge({
        isRequesting: true,
        errors: fromJS({}),
      });
    case types.FIND_USER_SUCCESS:
      return state.merge({
        isRequesting: false,
        errors: fromJS({}),
      });
    case types.FIND_USER_FAILURE:
      return state.merge({
        isRequesting: false,
        errors: fromJS(action.payload.errors || {}),
      });
    default:
      return state;
  }
}

export default startPageReducer;
