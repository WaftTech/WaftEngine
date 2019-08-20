import * as types from './constants';

export const loadCategoryRequest = payload => ({
  type: types.LOAD_CATEGORY_REQUEST,
  payload,
});
export const loadCategorySuccess = payload => ({
  type: types.LOAD_CATEGORY_SUCCESS,
  payload,
});
export const loadCategoryFailure = payload => ({
  type: types.LOAD_CATEGORY_FAILURE,
  payload,
});

export const loadBlogsRequest = payload => ({
  type: types.LOAD_BLOGS_REQUEST,
  payload,
});
export const loadBlogsSuccess = payload => ({
  type: types.LOAD_BLOGS_SUCCESS,
  payload,
});
export const loadBlogsFailure = payload => ({
  type: types.LOAD_BLOGS_FAILURE,
  payload,
});
