/*
*
* LoginPage reducer
*
*/

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  email: '',
  password: '',
  errors: {},
  loading: true,
});

const loginPageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_STORE_VALUE:
      return state.merge({
        [action.payload.key]: action.payload.value,
      });
    case types.CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default loginPageReducer;
