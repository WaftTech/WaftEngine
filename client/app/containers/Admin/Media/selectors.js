import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminMediaPage state domain
 */

export const selectMediaDomain = state =>
  state.adminMediaPage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectMediaDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectMediaDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectMediaDomain,
    substate => substate.query,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectMediaDomain,
    substate => substate.loading,
  );
/**
 * Default selector used by Media
 */

const makeSelectMedia = () =>
  createSelector(
    selectMediaDomain,
    substate => substate,
  );

export default makeSelectMedia;
