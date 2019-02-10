import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  faq: {},
});

function faqPageReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_FAQ_SUCCESS:
      return state.merge({
        faq: fromJS(action.payload.data),
      });
    default:
      return state;
  }
}

export default faqPageReducer;
