import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the roleManagePage state domain
 */

const selectDomain = state => state.get("leaveTypePage", initialState);

export const makeSelectAll = () =>
  createSelector(selectDomain, state => state.get("all"));
export const makeSelectOne = () =>
  createSelector(selectDomain, state => state.get("one"));
