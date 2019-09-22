/*
 *
 * Comments reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  one: {
    title: '',
    blog_id: '',
  },
  comments: {
    comment: [],
    totaldata: 0,
  },
  commentLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const commentsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_COMMENT_REQUEST:
        draft.commentLoading = true;
        break;
      case types.LOAD_COMMENT_SUCCESS:
        draft.comments = action.payload.data;
        draft.commentLoading = false;
        break;
      case types.LOAD_COMMENT_FAILURE:
        draft.commentLoading = false;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
      case types.CLEAR_ONE:
        draft.one.title = initialState.one.title;
        break;
      case types.POST_COMMENT_SUCCESS:
        draft.comments = {
          ...draft.comments,
          comment: [action.payload.data, ...draft.comments.comment],
          totaldata: draft.comments.totaldata + 1,
        };
        draft.one = { ...initialState.one, blog_id: state.one.blog_id };
        break;
      case types.EDIT_COMMENT_SUCCESS:
        draft.comments = {
          ...state.comments,
          comment: state.comments.comment.map(each => {
            if (action.payload.data._id === each._id)
              return action.payload.data;
            return each;
          }),
        };
        draft.one = { ...initialState.one, blog_id: state.one.blog_id };
        break;
      case types.DELETE_COMMENT_SUCCESS:
        draft.comments = {
          ...draft.comments,
          comment: draft.comments.comment.filter(
            each => each._id !== action.payload.data._id,
          ),
          totaldata: draft.comments.totaldata - 1,
        };
        break;
    }
  });

export default commentsReducer;
