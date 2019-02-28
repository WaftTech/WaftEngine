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
