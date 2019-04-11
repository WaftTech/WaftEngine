/*
 *
 * LoginAdminPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  email: '',
  password: '',
  errors: {},
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const loginAdminPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_STORE_VALUE:
        draft[action.payload.key] = action.payload.value;
        break;
      case types.LOGIN_FAILURE:
        draft.errors = { ...action.payload.errors };
        break;
      case types.CLEAR_STORE:
        draft = initialState;
        break;
    }
  });

export default loginAdminPageReducer;
