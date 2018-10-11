import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the organizationDetailPage state domain
 */

const selectOrganizationDetailPageDomain = state =>
  state.get('organizationDetailPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrganizationDetailPage
 */

const makeSelectOrganizationDetailPage = () =>
  createSelector(selectOrganizationDetailPageDomain, substate =>
    substate.toJS(),
  );

export default makeSelectOrganizationDetailPage;
export { selectOrganizationDetailPageDomain };
