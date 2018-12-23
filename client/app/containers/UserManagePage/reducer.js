/*
 *
 * UserManagePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  all: [],
  one: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ALL_SUCCESS:
      return state.merge({
        all: fromJS(action.payload.data),
      });
    case types.LOAD_ONE_SUCCESS:
      return state.merge({
        one: fromJS(action.payload.data),
      });
    case types.DELETE_ONE_SUCCESS:
      return state.merge({
        all: state.get('all').filter(each => each.get('_id')!== action.payload.data._id)
      });
    default:
      return state;
  }
}

export default reducer;
