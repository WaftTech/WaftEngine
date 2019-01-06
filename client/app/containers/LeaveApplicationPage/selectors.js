import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the roleManagePage state domain
 */

const selectDomain = state => state.get("leaveApplicationPage", initialState);

export const makeSelectAll = () =>
  createSelector(selectDomain, state => state.get("all"));
export const makeSelectOne = () =>
  createSelector(selectDomain, state => state.get("one"));
export const makeSelectEmployee = () =>
  createSelector(selectDomain, state => state.get("employee"));
export const makeSelectLeaveType = () =>
  createSelector(selectDomain, state => state.get("leaveType"));
export const makeSelectLeaveDays = () =>
  createSelector(selectDomain, state => state.get("totalLeaveDays"));
export const makeSelectPage = () =>
  createSelector(selectDomain, state => state.get("page"));
