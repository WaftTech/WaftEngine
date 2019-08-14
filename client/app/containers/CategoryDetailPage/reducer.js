import produce from 'immer';
import * as types from './constants';

export const initialState = {
  blog: [],
  loading: true,
};

const categoryDetailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_BLOG_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_BLOG_REQUEST:
        draft.loading = true;
        draft.blog = initialState.blog;
        break;
      case types.LOAD_BLOG_SUCCESS:
        draft.blog = action.payload.data;
        draft.loading = false;
        break;

      case types.CLEAR_BLOG:
        draft.blog = initialState.blog;
        draft.loading = true;
        break;
    }
  });

export default categoryDetailPageReducer;
