import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

export const selectLoginPageDomain = state =>
  state.get('loginPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectIsRequesting = () =>
  createSelector(selectLoginPageDomain, substate =>
    substate.get('isRequesting'),
  );
export const makeSelectErrors = () =>
  createSelector(selectLoginPageDomain, substate => substate.get('errors'));
/**
 * Default selector used by SignupPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => substate.toJS());

export default makeSelectLoginPage;
