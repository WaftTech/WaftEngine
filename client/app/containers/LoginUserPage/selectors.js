import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginUserPage state domain
 */

export const selectLoginUserPageDomain = state =>
  state.loginUserPage || initialState;

/**
 * Other specific selectors
 */
export const makeSelectLoading = () =>
  createSelector(
    selectLoginUserPageDomain,
    state => state.loading,
  );
export const makeSelectEmail = () =>
  createSelector(
    selectLoginUserPageDomain,
    state => state.email,
  );
export const makeSelectPassword = () =>
  createSelector(
    selectLoginUserPageDomain,
    state => state.password,
  );
export const makeSelectErrors = () =>
  createSelector(
    selectLoginUserPageDomain,
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
 * Default selector used by LoginUserPage
 */

const makeSelectLoginUserPage = () =>
  createSelector(
    selectLoginUserPageDomain,
    substate => substate,
  );

export default makeSelectLoginUserPage;
