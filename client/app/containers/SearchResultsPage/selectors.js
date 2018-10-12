import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchResultsPage state domain
 */

const selectSearchResultsPageDomain = state =>
  state.get('searchResultsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchResultsPage
 */

const makeSelectSearchResultsPage = () =>
  createSelector(selectSearchResultsPageDomain, substate => substate.toJS());

export default makeSelectSearchResultsPage;
export { selectSearchResultsPageDomain };
