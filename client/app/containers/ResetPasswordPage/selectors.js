import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the resetPasswordPage state domain
 */

const selectResetPasswordPageDomain = state =>
  state.get('resetPasswordPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ResetPasswordPage
 */

const makeSelectResetPasswordPage = () =>
  createSelector(selectResetPasswordPageDomain, substate => substate.toJS());

export default makeSelectResetPasswordPage;
export { selectResetPasswordPageDomain };
