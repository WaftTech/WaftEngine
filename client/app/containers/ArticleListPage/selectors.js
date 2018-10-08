import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the articleListPage state domain
 */

const selectArticleListPageDomain = state =>
  state.get('articleListPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ArticleListPage
 */

const makeSelectArticleListPage = () =>
  createSelector(selectArticleListPageDomain, substate => substate.toJS());

export default makeSelectArticleListPage;
export { selectArticleListPageDomain };
