import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.get('dashboard', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(selectDashboardDomain, substate => substate.toJS());

export default makeSelectDashboard;
export { selectDashboardDomain };
