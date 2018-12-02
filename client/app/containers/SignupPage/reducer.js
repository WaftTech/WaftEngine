/*
 *
 * SignupPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  isRequesting: false,
  errors: {},
});

function signupPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return state.merge({
        isRequesting: true,
        errors: fromJS({}),
      });
    case types.SIGNUP_SUCCESS:
      return state.merge({
        isRequesting: false,
        errors: fromJS({}),
      });
    case types.SIGNUP_FAILURE:
      return state.merge({
        isRequesting: false,
        errors: fromJS(action.payload.errors || {}),
      });
    default:
      return state;
  }
}

export default signupPageReducer;
