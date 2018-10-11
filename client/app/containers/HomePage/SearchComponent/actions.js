export const loadCategoriesRequest = payload => ({
  type: types.LOAD_CATEGORIES_REQUEST,
  payload,
});
export const loadCategoriesSuccess = payload => ({
  type: types.LOAD_CATEGORIES_SUCCESS,
  payload,
});
export const loadCategoriesFailure = payload => ({
  type: types.LOAD_CATEGORIES_FAILURE,
  payload,
});
