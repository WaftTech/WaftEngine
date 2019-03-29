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
