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
