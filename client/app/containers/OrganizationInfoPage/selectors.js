import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the organizationInfoPage state domain
 */

const selectOrganizationInfoPageDomain = state =>
  state.get('organizationInfoPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrganizationInfoPage
 */

const makeSelectOrganizationInfoPage = () =>
  createSelector(selectOrganizationInfoPageDomain, substate => substate.toJS());

export default makeSelectOrganizationInfoPage;
export { selectOrganizationInfoPageDomain };
