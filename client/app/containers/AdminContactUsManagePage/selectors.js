import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminContactUsManagePage state domain
 */

const selectAdminContactUsManagePageDomain = state =>
  state.adminContactUsManagePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminContactUsManagePage
 */

const makeSelectAdminContactUsManagePage = () =>
  createSelector(
    selectAdminContactUsManagePageDomain,
    substate => substate,
  );

export default makeSelectAdminContactUsManagePage;
export { selectAdminContactUsManagePageDomain };
