import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the rashifalListPage state domain
 */

const selectRashifalListPageDomain = state =>
  state.get('rashifalListPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RashifalListPage
 */

const makeSelectRashifalListPage = () =>
  createSelector(selectRashifalListPageDomain, substate => substate.toJS());

export default makeSelectRashifalListPage;
export { selectRashifalListPageDomain };
