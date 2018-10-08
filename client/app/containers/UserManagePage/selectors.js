import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userManagePage state domain
 */

const selectUserManagePageDomain = state =>
  state.get('userManagePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserManagePage
 */

const makeSelectUserManagePage = () =>
  createSelector(selectUserManagePageDomain, substate => substate.toJS());

export default makeSelectUserManagePage;
export { selectUserManagePageDomain };
