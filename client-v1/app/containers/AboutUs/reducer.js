/*
*
* AboutUs reducer
*
*/

import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  aboutUs: {},
});

const aboutUsReducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case types.LOAD_ABOUT_US_SUCCESS:
      return state.merge({
        aboutUs: fromJS(action.payload.data),
      });
    default:
      return state;
  }
};

export default aboutUsReducer;
