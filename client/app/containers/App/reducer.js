/*
 * AppReducer
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
  requesting: false,
  success: false,
  messages: [],
  dialog: null,
  user: {},
  token: '',
  status: 0,
});

function appReducer(state = initialState, action = { type: '' }) {
  const callType = action.type.slice(-7);
  if (callType === 'REQUEST') {
    return state.update('status', status => status + 1);
  }
  if (callType === 'SUCCESS') {
    if (action.payload.msg) {
      return state
        .update('status', status => status - 1)
        .update('messages', messages =>
          messages.set(messages.size, {
            type: 'success',
            text: action.payload.msg,
          }),
        );
    }
    return state.update('status', status => status - 1);
  }
  if (callType === 'FAILURE') {
    if (action.payload.msg) {
      return state
        .update('status', status => status - 1)
        .update('messages', messages =>
          messages.set(messages.size, {
            type: 'failure',
            text: action.payload.msg,
          }),
        );
    }
    return state.update('status', status => status - 1);
  }
  switch (action.type) {
    // case
    case types.SET_DIALOG:
      return state.merge({ dialog: fromJS(action.dialog) });
    case types.SET_USER:
      return state.merge({ user: fromJS(action.user) });
    case types.SET_TOKEN:
      localStorage.setItem('token', action.token);
      return state.merge({ token: action.token });
    case types.ADD_MESSAGE:
      return state.update('messages', messages =>
        messages.set(
          messages.size,
          fromJS({
            type: action.payload.type,
            text: action.payload.text,
          }),
        ),
      );
    case types.DELETE_MESSAGE:
      return state.update('messages', messages =>
        messages.delete(action.payload),
      );
    case types.LOGOUT:
      localStorage.setItem('token', '');
      return state.merge({
        user: fromJS({}),
        token: '',
      });
    default:
      return state;
  }
}

export default appReducer;
