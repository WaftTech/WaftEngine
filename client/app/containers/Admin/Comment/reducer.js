/*
 *
 * BlogCommentManagePage reducer
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
    blog_id: '',
    // status: 'onhold',
    is_approved: false,
    is_disapproved: false,
  },
  loading: false,
  query: {
    find_title: '',
    find_blog_id: '',
    // find_is_approved: false,
    // find_is_disapproved: false,
    size: 10,
  },
  requesting: false,
};

/* eslint-disable default-case, no-param-reassign */
const blogCommentManagePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_ALL_FAILURE:
        draft.loading = false;
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
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_ONE_VALUE:
        draft.one = action.payload;
        break;
      case types.APPROVE_REQUEST:
        draft.requesting = true;
        break;
      case types.DISAPPROVE_REQUEST:
        draft.requesting = true;
        break;
      case types.APPROVE_FAILURE:
        draft.requesting = false;
        break;
      case types.DISAPPROVE_FAILURE:
        draft.requesting = false;
        break;
      case types.APPROVE_SUCCESS:
        draft.requesting = false;
        break;
      case types.DISAPPROVE_SUCCESS:
        draft.requesting = false;
        for (let i = 0; i < action.payload.data.length; i++) {
          draft.all = {
            ...state.all,
            data: state.all.data.map(each => {
              if (each._id === action.payload.data[i]._id) {
                return action.payload.data[i];
              } else {
                return each;
              }
            }),
          };
        }
        break;
    }
  });

export default blogCommentManagePageReducer;
