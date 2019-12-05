/*
 *
 * SettingsManagePage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const settingsManagePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_SETTINGS_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SETTINGS_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_ALL_SETTINGS_FAILURE:
        draft.loading = false;
        break;
      case types.SET_VALUE:
        draft.all = action.payload;
        break;
    }
  });

export default settingsManagePageReducer;
