/*
 *
 * Testimonial reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totalData: 0,
    sort: {},
  },
  one: {
    title: '',
    url: '',
    description: '',
    order: '',
    is_active: '',
  },
  query: { size: 10, page: 1 },
  errors: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const socialMediaReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;

      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = ' ';
        break;

      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.all = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        draft.loading = false;
        break;

      case types.ADD_EDIT_FAILURE:
        draft.errors = { ...draft.errors, ...action.payload.errors };
        break;

      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data.id,
          ),
        };
        break;

      case types.ADD_FROM_MEDIA:
        draft.one.image = { ...action.payload };
        break;
    }
  });

export default socialMediaReducer;
