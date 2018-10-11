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

export const searchRequest = payload => ({
  type: types.SEARCH_REQUEST,
  payload,
});
export const searchSuccess = payload => ({
  type: types.SEARCH_SUCCESS,
  payload,
});
export const searchFailure = payload => ({
  type: types.SEARCH_FAILURE,
  payload,
});
