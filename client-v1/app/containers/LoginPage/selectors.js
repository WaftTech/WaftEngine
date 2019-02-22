import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */
const selectDomain = state => state.get('loginPage', initialState);

export const makeSelectEmail = () => createSelector(selectDomain, state => state.get('email'));
export const makeSelectPassword = () => createSelector(selectDomain, state => state.get('password'));
export const makeSelectErrors = () => createSelector(selectDomain, state => state.get('errors'));
export const makeSelectEmailError = () => createSelector(makeSelectErrors(), state => state.get('email'));
export const makeSelectPasswordError = () => createSelector(makeSelectErrors(), state => state.get('password'));
export const makeSelectLoading = () => createSelector(selectDomain, state => state.get('loading'));
