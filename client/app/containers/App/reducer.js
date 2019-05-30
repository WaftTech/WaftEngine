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
import produce from 'immer';

import * as types from './constants';

// The initial state of the App
export const initialState = {
  user: { isAdmin: false },
  token: '',
  content: {},
  media: {},
  slide: {},
  notifications: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action = { type: '' }) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_USER:
        localStorage.setItem(
          'routes',
          action.payload.routes
            ? JSON.stringify(action.payload.routes)
            : localStorage.routes,
        );
        draft.user = {
          ...action.payload,
          isAdmin:
            (action.payload.roles &&
              action.payload.roles.includes(
                '5bf7ae3694db051f5486f845' || '5bf7af0a736db01f8fa21a25',
              )) ||
            false,
        };
        break;
      case types.SET_TOKEN:
        localStorage.setItem('token', action.payload);
        draft.token = action.payload;
        break;
      case types.LOGOUT:
      case types.LOGOUT_SUCCESS:
        localStorage.setItem('token', '');
        localStorage.setItem('routes', '');
        draft.user = {};
        draft.token = '';
        break;
      case types.LOAD_CONTENT_SUCCESS:
        draft.content = {
          ...draft.content,
          [action.payload.data.key]: action.payload.data.description,
        };
        break;
      case types.LOAD_MEDIA_SUCCESS:
        draft.media = {
          ...draft.media,
          [action.payload.data._id]: action.payload.data, // eslint-disable-line no-underscore-dangle
        };
        break;
      // case types.LOAD_AVAILABLE_SUCCESS:
      //   draft.module = action.payload.data;
      //   break;
      case types.LOAD_SLIDE_SUCCESS:
        draft.slide = {
          ...draft.slide,
          [action.payload.data.slider_key]: action.payload.data,
        };
        break;
      case types.ENQUEUE_SNACKBAR:
        draft.notifications = [...draft.notifications, { ...action.payload }];
        break;
      case types.REMOVE_SNACKBAR:
        draft.notifications = [
          ...draft.notifications.filter(
            notification => notification.key !== action.payload,
          ),
        ];
        break;
    }
  });

export default appReducer;
