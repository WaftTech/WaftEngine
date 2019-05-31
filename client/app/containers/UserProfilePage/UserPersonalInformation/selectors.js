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

const makeSelectUserPersonalInformationPage = () =>
  createSelector(
    selectUserPersonalInformationPageDomain,
    substate => substate,
  );

export default makeSelectUserPersonalInformationPage;
