import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sliderManagePage state domain
 */

export const selectSliderManagePageDomain = state =>
  state.sliderManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectAll = () =>
  createSelector(
    selectSliderManagePageDomain,
    substate => substate.all,
  );

export const makeSelectOne = () =>
  createSelector(
    selectSliderManagePageDomain,
    substate => substate.one,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectSliderManagePageDomain,
    substate => substate.query,
  );

export const makeSelectMedia = () =>
  createSelector(
    selectSliderManagePageDomain,
    substate => substate.media,
  );
