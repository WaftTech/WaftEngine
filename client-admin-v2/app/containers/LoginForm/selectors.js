import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginForm state domain
 */

const selectDomain = state => state.get('loginForm', initialState);

export const makeSelectUsername = () =>
  createSelector(selectDomain, state => state.get('username'));
export const makeSelectPassword = () =>
  createSelector(selectDomain, state => state.get('password'));
export const makeSelectIsRequesting = () =>
  createSelector(selectDomain, state => state.get('isRequesting'));
