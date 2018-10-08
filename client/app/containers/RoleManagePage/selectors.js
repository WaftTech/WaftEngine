import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the roleManagePage state domain
 */

const selectRoleManagePageDomain = state =>
  state.get('roleManagePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RoleManagePage
 */

const makeSelectRoleManagePage = () =>
  createSelector(selectRoleManagePageDomain, substate => substate.toJS());

export default makeSelectRoleManagePage;
export { selectRoleManagePageDomain };
