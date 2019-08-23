import produce from 'immer';
import * as types from './constants';

export const initialState = {
  category: [],
  blogs: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
        break;

      case types.LOAD_BLOGS_SUCCESS:
        draft.blogs = action.payload.data;
        break;
    }
  });

export default reducer;
