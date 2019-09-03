import produce from 'immer';
import * as types from './constants';

export const initialState = {
  category: [],
  blogs: [],
  catLoading: false,
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CATEGORY_REQUEST:
        draft.catLoading = true;
        break;
      case types.LOAD_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
        draft.catLoading = false;
        break;
      case types.LOAD_CATEGORY_FAILURE:
        draft.catLoading = false;
        break;
      case types.LOAD_BLOGS_SUCCESS:
        draft.blogs = action.payload.data;
        break;
    }
  });

export default reducer;
