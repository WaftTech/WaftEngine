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
    ? 'http://api.ask4trip.in/api/'
    : // : "http://api.ask4trip.in/api/";
      'http://localhost:5010/api/';

export const IMAGE_BASE = process.env.NODE_ENV === 'production' ? 'http://api.ask4trip.in/' : 'http://api.ask4trip.in/'; //'http://localhost:5010/';

export const SET_USER = 'app/App/SET_USER';
export const SET_TOKEN = 'app/App/SET_TOKEN';
export const SET_DIALOG = 'app/App/SET_DIALOG';
export const ADD_MESSAGE = 'app/App/ADD_MESSAGE';
export const DELETE_MESSAGE = 'app/App/DELETE_MESSAGE';
export const LOGOUT = 'app/App/LOGOUT';

export const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
