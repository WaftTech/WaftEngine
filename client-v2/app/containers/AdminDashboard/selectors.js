import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminDashboard state domain
 */

const selectAdminDashboardDomain = state =>
  state.adminDashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdminDashboard
 */

const makeSelectAdminDashboard = () =>
  createSelector(
    selectAdminDashboardDomain,
    substate => substate,
  );

export default makeSelectAdminDashboard;
export { selectAdminDashboardDomain };
