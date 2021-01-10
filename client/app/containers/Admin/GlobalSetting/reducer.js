/*
 *
 * GlobalSetting reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  withdraw: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  loading: false,
  query: {},
  one: {
    key: '',
    value: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const globalSettingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_WITHDRAW_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_WITHDRAW_SUCCESS:
        draft.loading = false;
        draft.withdraw = action.payload;
        break;
      case types.LOAD_WITHDRAW_FAILURE:
        draft.loading = false;
        break;

      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;

      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;

      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;

      case types.SAVE_REQUEST:
        draft.loading = true;
        break;
      case types.SAVE_SUCCESS:
        draft.loading = false;
        break;
      case types.SAVE_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default globalSettingReducer;
