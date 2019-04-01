import produce from 'immer';
import * as types from './constants';

export const initialState = {
  blog: {},
};

const blogPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_BLOG_SUCCESS:
        draft.blog = action.payload.data;
    }
  });

export default blogPageReducer;
