import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the subscriberPage state domain
 */

export const selectSubscriberPageDomain = state =>
  state.subscriberPage || initialState;

export const makeSelectEmail = () =>
  createSelector(
    selectSubscriberPageDomain,
    state => state.email,
  );
export const makeSelectError = () =>
  createSelector(
    selectSubscriberPageDomain,
    state => state.errors,
  );
export const makeSelectEmailError = () =>
  createSelector(
    makeSelectError(),
    state => state.email,
  );
export const makeSelectSuccess = () =>
  createSelector(
    selectSubscriberPageDomain,
    state => state.success,
  );
export const makeSelectSuccessMsg = () =>
  createSelector(
    selectSubscriberPageDomain,
    state => state.successMsg,
  );
