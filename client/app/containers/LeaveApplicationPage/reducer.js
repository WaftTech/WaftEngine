/*
 *
 * RoleManagePage reducer
 *
 */
import { fromJS } from 'immutable';
import * as types from './constants';

export const initialState = fromJS({
  all: [],
  one: {},
  employee: [],
  leaveType: [],
  totalLeaveDays: [],
  page: [],
  success: '',
  error: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_ALL_SUCCESS:
      return state.merge({
        all: fromJS(action.payload.data),
        page: fromJS(action.payload),
      });
    case types.ADD_EDIT_FAILURE:
      return state.merge({
        error: fromJS(action.payload),
      });
    case types.ADD_EDIT_SUCCESS:
      return state.merge({
        success: fromJS(action.payload.msg),
      });
    case types.LOAD_ONE_SUCCESS:
      return state.merge({
        one: fromJS(action.payload.data),
      });
    case types.DELETE_ONE_SUCCESS:
      return state.merge({
        all: state.get('all').filter(each => each.get('_id') !== action.payload.data._id),
      });
    case types.LOAD_EMPLOYEE_SUCCESS:
      return state.merge({
        employee: fromJS(action.payload.data),
      });
    case types.LOAD_LEAVETYPE_SUCCESS:
      return state.merge({
        leaveType: fromJS(action.payload.data),
      });
    case types.LOAD_TOTAL_LEAVE_DAYS_SUCCESS:
      return state.merge({
        totalLeaveDays: fromJS(action.payload.data),
      });
    case types.CLEAR_SUCCESS_MESSAGE:
      return state.merge({
        success: null,
      });
    case types.CLEAR_FAILURE_MESSAGE:
      return state.merge({
        error: [],
      });
    default:
      return state;
  }
}

export default reducer;
