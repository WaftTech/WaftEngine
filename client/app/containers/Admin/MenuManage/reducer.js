/*
 *
 * MenuManage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [
      {
        title: '',
        order: 1,
        _id: 1,
        key: '',
      },
    ],
    page: 1,
    size: 10,
    totaldata: 1,
  },
  sub_menu: [],
  show_sub_menu: false,
  one: {
    title: '',
    key: '',
    order: '',
    is_active: false,
  },
  sub_menu_form: {
    title: '',
    is_internal: true,
    url: '',
    is_active: true,
    target: '_blank',
  },
  query: { find_title: '', size: 10 },
  loading: false,
  errors: { title: '', is_active: '' },
};

/* eslint-disable default-case, no-param-reassign */
const menuManageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SHOW_SUB_MENU:
        // draft.show_sub_menu = !draft.show_sub_menu;
        draft.show_sub_menu = action.payload;
        break;
      case types.LOAD_MENU_SUCCESS:
        draft.sub_menu = action.payload.data;
        break;
      case types.SET_ONE_VALUE:
        if (action.payload.index !== null) {
          draft.one.sub_menu[action.payload.index][action.payload.key] =
            action.payload.value;
        } else {
          draft.one[action.payload.key] = action.payload.value;
          draft.errors[action.payload.key] = ' ';
        }
        break;
      // case types.ADD_SUB_MENU:
      //   draft.one.sub_menu.push({ title: '', is_active: false });
      //   break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
      case types.ADD_EDIT_FAILURE_2:
        draft.errors = action.payload.errors;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data.parent;
        draft.sub_menu_form = action.payload.data.child;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        break;
    }
  });

export default menuManageReducer;
