import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newsListPage state domain
 */

const selectNewsListPageDomain = state =>
  state.get('newsListPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewsListPage
 */

const makeSelectNewsListPage = () =>
  createSelector(selectNewsListPageDomain, substate => substate.toJS());

export default makeSelectNewsListPage;
export { selectNewsListPageDomain };
