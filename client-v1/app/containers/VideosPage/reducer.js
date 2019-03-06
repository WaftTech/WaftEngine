import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  videos: {},
});

function videosPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_VIDEOS_SUCCESS:
      return state.merge({
        videos: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default videosPageReducer;
