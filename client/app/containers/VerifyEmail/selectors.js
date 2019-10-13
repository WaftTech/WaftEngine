import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the verifyEmail state domain
 */

export const selectDomain = state => state.verifyEmail || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectDomain,
    state => state.defaultData,
  );

/**
 * Default selector used by VerifyEmail
 */

const makeSelectVerifyEmail = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectVerifyEmail;
