/*
 * reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import * as types from './constants';

// The initial state of the App
export const initialState = fromJS({
  aboutUs: {},
});

function reducer(state = initialState, action = { type: '' }) {
  switch (action.type) {
    case types.LOAD_ABOUT_US_SUCCESS:
      return state.merge({
        aboutUs: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default reducer;
