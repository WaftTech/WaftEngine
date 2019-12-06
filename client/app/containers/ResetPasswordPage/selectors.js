import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the resetPasswordPage state domain
 */

export const selectDomain = state => state.resetPasswordPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectDomain,
    state => state.defaultData,
  );

export default makeSelectResetPasswordPage;
