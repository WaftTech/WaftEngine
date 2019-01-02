import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the wtDashboard state domain
 */

const selectWtDashboardDomain = state => state.get("wtDashboard", initialState);
const selectUserDomain = state => state.get("global", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by WtDashboard
 */

const makeSelectWtDashboard = () =>
  createSelector(selectWtDashboardDomain, substate => substate.toJS());

const makeSelectUser = () =>
  createSelector(selectUserDomain, state => state.get("user"));

export default makeSelectWtDashboard;
export { selectWtDashboardDomain, makeSelectUser };
