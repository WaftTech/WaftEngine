import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectUserPersonalInformationPageDomain = state =>
  state.userPersonalInformationPage || initialState;

export const makeSelectOne = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.one,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.errors,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.loading,
  );
export const makeSelectEmailVerified = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.email_verified,
  );
export const makeSelectCode = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate.verification_code,
  );

const makeSelectUserPersonalInformationPage = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate,
  );

export default makeSelectUserPersonalInformationPage;
