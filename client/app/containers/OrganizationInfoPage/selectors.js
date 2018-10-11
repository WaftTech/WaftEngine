import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the organizationInfoPage state domain
 */

const selectDomain = state => state.get('organizationInfoPage', initialState);

export const makeSelectAll = () =>
  createSelector(selectDomain, state => state.get('all'));
export const makeSelectOne = () =>
  createSelector(selectDomain, state => state.get('one'));
