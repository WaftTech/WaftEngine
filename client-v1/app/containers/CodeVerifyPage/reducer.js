/*
*
* CodeVerifyPage reducer
*
*/

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  email: '',
  code: '',
  password: '',
});

const codeVerifyPageReducer = (state = initialState, action = {}) => {
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

export default codeVerifyPageReducer;
