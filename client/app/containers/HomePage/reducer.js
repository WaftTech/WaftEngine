import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  fourorg: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_FOURORG_SUCCESS:
      return state.merge({
        fourorg: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default reducer;
