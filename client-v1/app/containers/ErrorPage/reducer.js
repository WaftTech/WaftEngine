import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  errors: [],
  page: [],
});

function errorPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ERROR_SUCCESS:
      return state.merge({
        errors: fromJS(action.payload.data),
        page: fromJS(action.payload),
      });
    // case types.DELETE_ONE_SUCCESS:
    //   return state.merge({
    //     errors: state.get('errors').filter(each => each.get('_id') !== action.payload.data._id),
    //   });
    default:
      return state;
  }
}

export default errorPageReducer;
