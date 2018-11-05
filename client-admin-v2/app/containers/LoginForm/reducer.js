/*
 *
 * LoginForm reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  username: '',
  password: '',
  isRequesting: false,
});

function loginFormReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_HANDLER:
      return state.merge({
        [action.metadata]: action.payload,
      });
    default:
      return state;
  }
}

export default loginFormReducer;
