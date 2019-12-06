/*
 *
 * ResetPasswordPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  defaultData: {
    code: '',
    password: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const resetPasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.DEFAULT_ACTION_REQUEST:
        draft.defaultData = 'default data is loading';
        break;
      case types.DEFAULT_ACTION_SUCCESS:
        draft.defaultData = 'default data is loaded';
        break;
      case types.DEFAULT_ACTION_FAILURE:
        draft.defaultData = 'default data is loading failure';
        break;
      case types.SET_DATA:
        draft.defaultData[action.payload.key] = action.payload.value;
        break;
    }
  });

export default resetPasswordPageReducer;
