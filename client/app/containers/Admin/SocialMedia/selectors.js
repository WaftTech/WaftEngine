import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the testimonial state domain
 */

export const selectDomain = state => state.socialMedia || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    substate => substate.one,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    substate => substate.loading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    substate => substate.query,
  );

export const makeSelectErrors = () =>
  createSelector(
    selectDomain,
    substate => substate.errors,
  );

/**
 * Default selector used by Social Media
 */

const makeSelectSocialMedia = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectSocialMedia;
