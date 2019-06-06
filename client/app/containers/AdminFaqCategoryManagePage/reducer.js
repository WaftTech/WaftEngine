/*
 *
 * AdminFaqCategoryManagePage reducer
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
  one: {
    title: '',
    is_active: false,
  },
  query: { find_title: '', size: 10 },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
      case types.DELETE_CAT_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
    }
  });

export default reducer;
