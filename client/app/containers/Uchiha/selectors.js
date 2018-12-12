import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the uchiha state domain
 */

const selectUchihaDomain = state => state.get("uchiha", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Uchiha
 */

const makeSelectUchiha = () =>
  createSelector(selectUchihaDomain, substate => substate.toJS());

export default makeSelectUchiha;
export { selectUchihaDomain };
