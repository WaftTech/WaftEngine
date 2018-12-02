import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userManagePage state domain
 */

const selectDomain = state => state.get('userManagePage', initialState);

export const makeSelectAll = () =>
  createSelector(selectDomain, state => state.get('all'));
export const makeSelectOne = () =>
  createSelector(selectDomain, state => state.get('one'));
