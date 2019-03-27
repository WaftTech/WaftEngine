/*
 *
 * BlogManagePage reducer
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
    category: '',
    published_on: '',
    added_at: '',
    is_published: true,
    is_active: false,
  },
  query: { find_title: '' },
  category: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
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
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload.data;
        break;

      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;

      case types.LOAD_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
        break;
    }
  });

export default reducer;
