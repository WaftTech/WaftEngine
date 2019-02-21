/*
*
* AboutUs reducer
*
*/

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({});

const aboutUsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
};

export default aboutUsReducer;
