import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the categoryDetailPage state domain
 */

const selectCategoryDetailPageDomain = state =>
  state.get('categoryDetailPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CategoryDetailPage
 */

const makeSelectCategoryDetailPage = () =>
  createSelector(selectCategoryDetailPageDomain, substate => substate.toJS());

export default makeSelectCategoryDetailPage;
export { selectCategoryDetailPageDomain };
