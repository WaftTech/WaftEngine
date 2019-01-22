import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the wtDashboard state domain
 */

const selectWtDashboardDomain = state => state.get('wtDashboard', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by WtDashboard
 */

const makeSelectWtDashboard = () =>
  createSelector(selectWtDashboardDomain, substate => substate.toJS());

export default makeSelectWtDashboard;
export { selectWtDashboardDomain };
