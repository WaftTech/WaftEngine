import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  category: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CATEGORY_SUCCESS:
      return state.merge({
        category: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default reducer;
