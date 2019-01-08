/*
 *
 * LeaveApplication actions
 *
 */

import * as types from "./constants";

export const loadAllRequest = payload => ({
  type: types.LOAD_ALL_REQUEST,
  payload
});
export const loadAllSuccess = payload => ({
  type: types.LOAD_ALL_SUCCESS,
  payload
});
export const loadAllFailure = payload => ({
  type: types.LOAD_ALL_FAILURE,
  payload
});
//Get Employee actions
export const loadEmployeeRequest = payload => ({
  type: types.LOAD_EMPLOYEE_REQUEST,
  payload
});
export const loadEmployeeSuccess = payload => ({
  type: types.LOAD_EMPLOYEE_SUCCESS,
  payload
});
export const loadEmployeeFailure = payload => ({
  type: types.LOAD_EMPLOYEE_FAILURE,
  payload
});

//Get LeaveType Actions
export const loadLeaveTypeRequest = payload => ({
  type: types.LOAD_LEAVETYPE_REQUEST,
  payload
});
export const loadLeaveTypeSuccess = payload => ({
  type: types.LOAD_LEAVETYPE_SUCCESS,
  payload
});
export const loadLeaveTypeFailure = payload => ({
  type: types.LOAD_LEAVETYPE_FAILURE,
  payload
});

//Get TOTAL_NUMBER_OF_DAYS Actions
export const loadTotalLeaveDaysRequest = payload => ({
  type: types.LOAD_TOTAL_LEAVE_DAYS_REQUEST,
  payload
});
export const loadTotalLeaveDaysSuccess = payload => ({
  type: types.LOAD_TOTAL_LEAVE_DAYS_SUCCESS,
  payload
});
export const loadTotalLeaveDaysFailure = payload => ({
  type: types.LOAD_TOTAL_LEAVE_DAYS_FAILURE,
  payload
});

export const loadOneRequest = payload => ({
  type: types.LOAD_ONE_REQUEST,
  payload
});
export const loadOneSuccess = payload => ({
  type: types.LOAD_ONE_SUCCESS,
  payload
});
export const loadOneFailure = payload => ({
  type: types.LOAD_ONE_FAILURE,
  payload
});

export const addEditRequest = payload => ({
  type: types.ADD_EDIT_REQUEST,
  payload
});
export const addEditSuccess = payload => ({
  type: types.ADD_EDIT_SUCCESS,
  payload
});
export const addEditFailure = payload => ({
  type: types.ADD_EDIT_FAILURE,
  payload
});

export const deleteOneRequest = payload => ({
  type: types.DELETE_ONE_REQUEST,
  payload
});
export const deleteOneSuccess = payload => ({
  type: types.DELETE_ONE_SUCCESS,
  payload
});
export const deleteOneFailure = payload => ({
  type: types.DELETE_ONE_FAILURE,
  payload
});
