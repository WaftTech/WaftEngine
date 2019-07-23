/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  users: {
    data: [],
    totaldata: 0,
  },
  errors: {
    data: [],
    totaldata: 0,
  },
  info: [],
  blog: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_USER_SUCCESS:
        draft.users = action.payload;
        break;
      case types.LOAD_ERROR_SUCCESS:
        draft.errors = action.payload;
        break;
      case types.LOAD_INFO_SUCCESS:
        draft.info = action.payload.data;
        break;
      case types.LOAD_BLOG_SUCCESS:
        draft.blog = action.payload.data;
        break;
    }
  });

export default reducer;
