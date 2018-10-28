import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the organizationDetailPage state domain
 */

const selectDomain = state => state.get('organizationDetailPage', initialState);

export const makeSelectOrganization = () =>
  createSelector(selectDomain, state => state.get('organization'));
