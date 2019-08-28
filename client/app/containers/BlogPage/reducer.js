import produce from 'immer';
import * as types from './constants';

export const initialState = {
  blog: {},
  loading: false,
  relatedBlogs: [],
  relatedBlogsIsLoading: false,
  recentBlogs: [],
  recentBlogsIsLoading: false,
  one: {
    title: '',
    blog_id: '',
  },
  comments: {
    comment: [],
    totaldata: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
const blogPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_BLOG_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_BLOG_SUCCESS:
        draft.loading = false;
        draft.blog = action.payload.data;
        break;
      case types.LOAD_BLOG_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_RELATED_BLOGS_REQUEST:
        draft.relatedBlogsIsLoading = true;
        break;
      case types.LOAD_RELATED_BLOGS_SUCCESS:
        draft.relatedBlogsIsLoading = false;
        draft.relatedBlogs = action.payload.data;
        break;
      case types.LOAD_RELATED_BLOGS_FAILURE:
        draft.relatedBlogsIsLoading = false;
        break;
      case types.LOAD_RECENT_BLOGS_REQUEST:
        draft.recentBlogsIsLoading = true;
        break;
      case types.LOAD_RECENT_BLOGS_SUCCESS:
        draft.recentBlogsIsLoading = false;
        draft.recentBlogs = action.payload.data;
        break;
      case types.LOAD_RECENT_BLOGS_FAILURE:
        draft.recentBlogsIsLoading = false;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.LOAD_COMMENT_SUCCESS:
        draft.comments = action.payload.data;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.one = action.payload.data;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.POST_COMMENT_SUCCESS:
        draft.comments = {
          ...draft.comments,
          comment: [...draft.comments.comment, action.payload.data],
          totaldata: draft.comments.totaldata + 1,
        };
        draft.one = initialState.one;
        break;
      case types.DELETE_COMMENT_SUCCESS:
        draft.comments = {
          ...draft.comments,
          comment: draft.comments.comment.filter(
            each => each._id !== action.payload.data._id,
          ),
          totaldata: draft.comments.totaldata - 1,
        };
    }
  });

export default blogPageReducer;
