import produce from 'immer';
import * as types from './constants';

// The initial state of the App
export const initialState = {
  blogList: [],
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_BLOG_LIST_SUCCESS:
        draft.blogList = action.payload.data;
    }
  });

export default reducer;
