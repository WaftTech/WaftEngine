import produce from 'immer';
import * as types from './constants';

// The initial state of the App
export const initialState = {
  blogList: [],
  loading: false,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_BLOG_LIST_REQUEST:
        draft.loading = true;
        break;

      case types.LOAD_BLOG_LIST_SUCCESS:
        draft.blogList = action.payload.data;
        draft.loading = false;

      case types.LOAD_BLOG_LIST_FAILURE:
        draft.loading = false;
    }
  });

export default reducer;
