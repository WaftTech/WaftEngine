import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forgotPasswordPage state domain
 */

const selectForgotPasswordPageDomain = state => state.get('forgotPasswordPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectEmail = () => createSelector(selectForgotPasswordPageDomain, state => state.get('email'));

export const makeSelectErrors = () => createSelector(selectForgotPasswordPageDomain, state => state.get('errors'));

export const makeSelectEmailError = () => createSelector(makeSelectErrors(), state => state.get('email'));
