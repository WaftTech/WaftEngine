/*
 *
 * CompanyPage reducer
 *
 */
import { fromJS } from "immutable";
import * as types from "./constants";

export const initialState = fromJS({
  one: {}
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ONE_SUCCESS:
      return state.merge({
        one: fromJS(action.payload.data)
      });

    default:
      return state;
  }
}

export default reducer;
