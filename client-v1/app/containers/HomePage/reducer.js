import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  // company: [],
  offer: {
    data: [],
    size: 10,
    page: 1,
    totaldata: 0,
  },
});

function reducer(state = initialState, action) {
  switch (action.type) {
    // case types.LOAD_COMPANY_SUCCESS:
    //   return state.merge({
    //     company: fromJS(action.payload.data),
    //   });

    case types.LOAD_OFFER_SUCCESS:
      return state.merge({
        offer: fromJS(action.payload),
      });

    default:
      return state;
  }
}

export default reducer;
