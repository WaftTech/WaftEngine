/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

export const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://waftengine.com/api/'
    : 'http://localhost:5050/api/';

export const IMAGE_BASE =
  process.env.NODE_ENV === 'production' ? 'https://waftengine.com/' : 'https://waftengine.com/';

export const SET_USER = 'app/App/SET_USER';
export const SET_TOKEN = 'app/App/SET_TOKEN';
export const SET_DIALOG = 'app/App/SET_DIALOG';
export const LOGOUT = 'app/App/LOGOUT';

export const SUBSCRIBE_REQUEST = 'app/App/SUBSCRIBE_REQUEST';
export const SUBSCRIBE_SUCCESS = 'app/App/SUBSCRIBE_SUCCESS';
export const SUBSCRIBE_FAILURE = 'app/App/SUBSCRIBE_FAILURE';

export const CLEAR_MESSAGES = 'app/App/CLEAR_MESSAGES';

export const LOAD_CONTENT_REQUEST = 'app/App/LOAD_CONTENT_REQUEST';
export const LOAD_CONTENT_SUCCESS = 'app/App/LOAD_CONTENT_SUCCESS';
export const LOAD_CONTENT_FAILURE = 'app/App/LOAD_CONTENT_FAILURE';
