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
  settings_normalized: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const settingsManagePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const normalized = {};
    switch (action.type) {
      case types.LOAD_ALL_SETTINGS_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SETTINGS_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        action.payload.data.map(each => {
          normalized[each.key] = each;
          return null;
        });
        draft.settings_normalized = normalized;
        break;
      case types.LOAD_ALL_SETTINGS_FAILURE:
        draft.loading = false;
        break;
      case types.SET_VALUE:
        const key = action.payload.key;
        draft.settings_normalized[key] = {
          ...draft.settings_normalized[key],
          value: action.payload.value,
        };
        break;
    }
  });

export default settingsManagePageReducer;
