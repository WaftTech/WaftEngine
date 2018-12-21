import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the registrationPage state domain
 */

const selectDomain = state => state.get("registrationPage", initialState);

export const makeSelectAll = () =>
  createSelector(selectDomain, state => state.get("all"));
export const makeSelectOne = () =>
  createSelector(selectDomain, state => state.get("one"));
export const makeSelectError = () =>
  createSelector(selectDomain, state => state.get("errors"));
