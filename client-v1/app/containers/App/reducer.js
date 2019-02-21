/*
*
* AboutUs reducer
*
*/

import { fromJS } from 'immutable';
// import * as types from './constants';

export const initialState = fromJS({});

const aboutUsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default aboutUsReducer;
