import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginAdminPage state domain
 */

export const selectLoginAdminPageDomain = state =>
  state.loginAdminPage || initialState;

/**
 * Other specific selectors
 */
export const makeSelectLoading = () =>
  createSelector(
    selectLoginAdminPageDomain,
    state => state.loading,
  );
export const makeSelectEmail = () =>
  createSelector(
    selectLoginAdminPageDomain,
    state => state.email,
  );
export const makeSelectPassword = () =>
  createSelector(
    selectLoginAdminPageDomain,
    state => state.password,
  );
export const makeSelectTwoFactor = () =>
  createSelector(
    selectLoginAdminPageDomain,
    state => state.twoFactor,
  );
export const makeSelectHelperObj = () =>
  createSelector(
    selectLoginAdminPageDomain,
    state => state.helperObj,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectLoginAdminPageDomain,
    state => state.errors,
  );
export const makeSelectEmailError = () =>
  createSelector(
    makeSelectErrors(),
    state => state.email,
  );
export const makeSelectPasswordError = () =>
  createSelector(
    makeSelectErrors(),
    state => state.password,
  );

/**
 * Default selector used by LoginAdminPage
 */

const makeSelectLoginAdminPage = () =>
  createSelector(
    selectLoginAdminPageDomain,
    substate => substate,
  );

export default makeSelectLoginAdminPage;
