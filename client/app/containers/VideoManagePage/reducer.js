import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  all: [],
  one: {},
  page: [],
  video: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ALL_SUCCESS:
      return state.merge({
        all: fromJS(action.payload.data),
        page: fromJS(action.payload),
      });
    case types.LOAD_ONE_SUCCESS:
      return state.merge({
        one: fromJS(action.payload.data),
      });
    case types.LOAD_VIDEO_SUCCESS:
      return state.merge({
        video: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default reducer;
