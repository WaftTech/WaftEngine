import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.sliderManagePage || initialState;

export const makeSelectAll = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );
export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    state => state.one,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    state => state.query,
  );
