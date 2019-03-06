import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  videoDetail: {},
});

function videoDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_VIDEODETAIL_SUCCESS:
      return state.merge({
        videoDetail: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default videoDetailPageReducer;
