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
    find_is_approved: true,
    find_is_disapproved: false,
    size: 10,
  },
  requesting: false,
};

/* eslint-disable default-case, no-param-reassign */
const blogCommentManagePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    let helperObj = {};
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
      case types.DISAPPROVE_REQUEST:
        draft.requesting = true;
        break;
      case types.APPROVE_FAILURE:
      case types.DISAPPROVE_FAILURE:
        draft.requesting = false;
        break;
      case types.DISAPPROVE_SUCCESS:
      case types.APPROVE_SUCCESS:
        draft.requesting = false;
        draft.all.data = state.all.data.map(each => {
          // case for each is updated
          helperObj =
            action.payload.data.reduce(
              (acc, curr) => ({ ...acc, [curr._id]: curr }),
              {},
            ) || {};
          if (Object.keys(helperObj).includes(each._id)) {
            return helperObj[each._id];
          }
          return each;
        });
        break;
    }
  });

export default blogCommentManagePageReducer;
