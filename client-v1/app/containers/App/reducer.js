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
  isRequesting: false,
  success: false,
  dialog: null,
  user: {},
  token: '',
  status: 0,
  successMessage: '',
  errorMessage: '',
  contents: {},
  media: {},
});

function appReducer(state = initialState, action = { type: '' }) {
  switch (action.type) {
    case types.SET_USER:
      return state.merge({ user: fromJS(action.payload) });
    case types.SET_TOKEN:
      return state.merge({ token: action.payload });
    case types.LOGOUT:
      return state.merge({
        user: fromJS({}),
        token: '',
      });
    case types.SUBSCRIBE_REQUEST:
      return state.merge({
        isRequesting: true,
        success: false,
        successMessage: '',
        errorMessage: '',
      });
    case types.SUBSCRIBE_SUCCESS:
      return state.merge({
        isRequesting: false,
        success: true,
        successMessage: action.payload.msg,
      });
    case types.SUBSCRIBE_FAILURE:
      return state.merge({
        isRequesting: false,
        success: true,
        errorMessage: typeof action.payload.msg === 'string' ? action.payload.msg : 'something went wrong',
      });
    case types.CLEAR_MESSAGES:
      return state.merge({
        successMessage: '',
        errorMessage: '',
      });
    case types.LOAD_CONTENT_SUCCESS:
      if (!action.payload.data) return state;
      return state.merge({
        contents: state.get('contents').merge({
          [action.payload.data.key]: action.payload.data.description,
        }),
      });
    case types.LOAD_MEDIA_SUCCESS:
      return state.merge({
        contents: state.get('media').merge({
          [action.payload.data._id]: action.payload.data, // eslint-disable-line no-underscore-dangle
        }),
      });
    default:
      return state;
  }
}

export default appReducer;
