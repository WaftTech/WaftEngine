import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminTemplateListingPage state domain
 */

export const selectAdminTemplateListingPageDomain = state =>
  state.adminTemplateListingPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectAdminTemplateListingPageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectAdminTemplateListingPageDomain,
    substate => substate.one,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectAdminTemplateListingPageDomain,
    substate => substate.loading,
  );

/**
 * Default selector used by AdminTemplateListingPage
 */

const makeSelectAdminTemplateListingPage = () =>
  createSelector(
    selectAdminTemplateListingPageDomain,
    substate => substate,
  );

export default makeSelectAdminTemplateListingPage;
