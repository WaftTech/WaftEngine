import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () => createSelector(selectLoginPageDomain, substate => substate.toJS());

export const makeSelectUsername = () => createSelector(selectLoginPageDomain, state => state.get('username'));
export const makeSelectPassword = () => createSelector(selectLoginPageDomain, state => state.get('password'));

export default makeSelectLoginPage;
export { selectLoginPageDomain };
