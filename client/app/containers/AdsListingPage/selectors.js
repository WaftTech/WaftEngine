import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adsListingPage state domain
 */

const selectDomain = state => state.get('adsListingPage', initialState);

export const makeSelectAll = () =>
  createSelector(selectDomain, state => state.get('all'));
export const makeSelectOne = () =>
  createSelector(selectDomain, state => state.get('one'));
