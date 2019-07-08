import produce from 'immer';
import * as types from './constants';

export const initialState = {
  blog: {},
  loading: false,
};

const blogPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_BLOG_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_BLOG_SUCCESS:
        draft.loading = false;
        draft.blog = action.payload.data;

      case types.LOAD_BLOG_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default blogPageReducer;
