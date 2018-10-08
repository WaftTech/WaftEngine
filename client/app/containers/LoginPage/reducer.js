/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';
import { LOGOUT } from '../App/constants';

export const initialState = fromJS({
  isRequesting: false,
  errors: {},
});

function loginPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESET_PASSWORD_REQUEST:
    case types.LOGIN_REQUEST:
      return state.merge({
        isRequesting: true,
        error: fromJS({}),
      });
    case types.RESET_PASSWORD_FAILURE:
    case types.LOGIN_FAILURE:
      return state.merge({
        isRequesting: false,
        errors: fromJS(action.payload.errors || {}),
      });
    case types.RESET_PASSWORD_SUCCESS:
    case types.LOGIN_SUCCESS:
      return state.merge({
        isRequesting: false,
        errors: fromJS({}),
      });
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default loginPageReducer;
