import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */
const selectDomain = state => state.get('loginPage', initialState);

export const makeSelectUsername = () => createSelector(selectDomain, state => state.get('username'));
export const makeSelectPassword = () => createSelector(selectDomain, state => state.get('password'));
