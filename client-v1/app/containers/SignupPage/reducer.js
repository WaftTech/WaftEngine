/*
*
* SignupPage reducer
*
*/

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  username: '',
  email: '',
});

const signupPageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_STORE_VALUE:
      return state.merge({
        [action.payload.key]: action.payload.value,
      });
    default:
      return state;
  }
};

export default signupPageReducer;
