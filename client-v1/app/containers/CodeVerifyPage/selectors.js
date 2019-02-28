import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the codeVerifyPage state domain
 */

export const selectCodeVerifyPageDomain = state => state.get('codeVerifyPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectEmail = () => createSelector(selectCodeVerifyPageDomain, state => state.get('email'));

export const makeSelectCode = () => createSelector(selectCodeVerifyPageDomain, state => state.get('code'));

export const makeSelectPassword = () => createSelector(selectCodeVerifyPageDomain, state => state.get('password'));

export const makeSelectError = () => createSelector(selectCodeVerifyPageDomain, state => state.get('errors'));

export const makeSelectEmailError = () => createSelector(makeSelectError(), state => state.get('email'));

export const makeSelectCodeError = () => createSelector(makeSelectError(), state => state.get('code'));

export const makeSelectPasswordError = () => createSelector(makeSelectError(), state => state.get('password'));
