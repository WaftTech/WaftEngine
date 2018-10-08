import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the categoryManagePage state domain
 */

const selectCategoryManagePageDomain = state =>
  state.get('categoryManagePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CategoryManagePage
 */

const makeSelectCategoryManagePage = () =>
  createSelector(selectCategoryManagePageDomain, substate => substate.toJS());

export default makeSelectCategoryManagePage;
export { selectCategoryManagePageDomain };
