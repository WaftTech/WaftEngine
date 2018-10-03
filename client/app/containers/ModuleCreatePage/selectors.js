import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the moduleCreatePage state domain
 */

const selectModuleCreatePageDomain = state =>
  state.get('moduleCreatePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ModuleCreatePage
 */

const makeSelectModuleCreatePage = () =>
  createSelector(selectModuleCreatePageDomain, substate => substate.toJS());

export default makeSelectModuleCreatePage;
export { selectModuleCreatePageDomain };
