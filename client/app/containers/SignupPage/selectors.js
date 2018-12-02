import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signupPage state domain
 */

export const selectSignupPageDomain = state =>
  state.get('signupPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectIsRequesting = () =>
  createSelector(selectSignupPageDomain, substate =>
    substate.get('isRequesting'),
  );
export const makeSelectErrors = () =>
  createSelector(selectSignupPageDomain, substate => substate.get('errors'));
/**
 * Default selector used by SignupPage
 */

const makeSelectSignupPage = () =>
  createSelector(selectSignupPageDomain, substate => substate.toJS());

export default makeSelectSignupPage;
