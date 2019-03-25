/*
 *
 * AdminRoleManage reducer
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
    msg: '',
  },
  one: {
    module_name: '',
    description: '',
    path: [],
  },
  access: {
    Access: [],
    Module: {
      path: [],
    },
    Roles: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const adminRoleManageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.SET_ACCESS_VALUE:
        draft.access[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
      case types.LOAD_ACCESS_SUCCESS:
        draft.access = action.payload.data;
        break;
      case types.DEFAULT_ACTION:
        break;
    }
  });

export default adminRoleManageReducer;
