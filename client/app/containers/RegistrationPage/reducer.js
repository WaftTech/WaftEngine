/*
 *
 * RegistrationPage reducer
 *
 */
import { fromJS } from "immutable";
import * as types from "./constants";

export const initialState = fromJS({
  all: [],
  one: {},
  errors: {},
  isRequesting: false
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_EDIT_FAILURE:
    case types.LOAD_ONE_FAILURE:
    case types.LOAD_ALL_FAILURE:
      return state.merge({
        errors: fromJS(action.payload.errors || {}),
        isRequesting: false
      });
    case types.ADD_EDIT_REQUEST:
      return state.merge({
        errors: fromJS({}),
        isRequesting: true
      });
    case types.LOAD_ALL_SUCCESS:
      return state.merge({
        all: fromJS(action.payload.data),
        isRequesting: false
      });
    case types.LOAD_ONE_SUCCESS:
      return state.merge({
        one: fromJS(action.payload.data),
        isRequesting: false
      });
    case types.DELETE_ONE_SUCCESS:
      return state.merge({
        all: state
          .get("all")
          .filter(each => each.get("_id") !== action.payload.data._id)
      });
    default:
      return state;
  }
}

export default reducer;
