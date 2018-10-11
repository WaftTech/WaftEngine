import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import * as types from './constants';
import { categoriesSchema } from './schemas';

export const initialState = fromJS({
  categories: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return state.merge({
        categories: fromJS(
          normalize(action.payload.data || [], [categoriesSchema]).entities
            .categories || {},
        ),
      });
    default:
      return state;
  }
}

export default reducer;
