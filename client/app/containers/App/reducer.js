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
import { LOAD_ALL_SUCCESS as MEDIA_LOAD_ALL_SUCCESS } from '../Admin/Media/constants';
import * as utils from './utils';

// The initial state of the App
export const initialState = {
  user: { isAdmin: false },
  token: '',
  content: {},
  media: {},
  slide: {},
  notifications: [],
  access: {},
  latestBlogs: {},
  menu: {},
  blogLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action = { type: '' }) =>
  produce(state, draft => {
    const access = {};
    let isAdmin = false;
    switch (action.type) {
      case MEDIA_LOAD_ALL_SUCCESS:
        draft.media = {
          ...state.media,
          ...utils.normalizeMedia(action.payload.data),
        };
        break;
      case types.SET_USER:
        localStorage.setItem(
          'routes',
          action.payload.routes
            ? JSON.stringify(action.payload.routes)
            : localStorage.routes,
        );
        (action.payload.routes || []).map(each => {
          if (each.admin_routes.includes('/admin/dashboard')) {
            isAdmin = true;
          }
          each.admin_routes.map(route => {
            access[route] = [...(access[route] || []), each.access_type];
          });
        });
        draft.user = {
          ...action.payload,
          isAdmin,
        };
        draft.access = access;
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
      case types.LOAD_LATEST_BLOGS_SUCCESS:
        draft.latestBlogs[action.payload.data.category._id] =
          action.payload.data;
        draft.blogLoading = false;
        break;
      case types.LOAD_LATEST_BLOGS_REQUEST:
        draft.blogLoading = true;
        break;
      case types.LOAD_LATEST_BLOGS_FAILURE:
        draft.blogLoading = false;
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
      case types.LOAD_MENU_SUCCESS:
        draft.menu = {
          ...draft.menu,
          [action.payload.data.key]: action.payload.data.child,
        };
        break;
    }
  });

export default appReducer;
