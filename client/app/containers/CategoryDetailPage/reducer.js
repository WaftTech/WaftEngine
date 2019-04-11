import produce from 'immer';
import * as types from './constants';

export const initialState = {
  category: {},
  blog: [{ category: { title: '' } }],
};

const categoryDetailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
        break;
      case types.LOAD_BLOG_SUCCESS:
        draft.blog = action.payload.data;
        break;
    }
  });

export default categoryDetailPageReducer;
