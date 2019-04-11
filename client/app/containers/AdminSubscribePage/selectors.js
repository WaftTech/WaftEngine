import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adminSubscribePage state domain
 */

export const selectAdminSubscribePageDomain = state =>
  state.adminSubscribePage || initialState;

export const makeSelectAll = () =>
  createSelector(
    selectAdminSubscribePageDomain,
    state => state.all,
  );
export const makeSelectOne = () =>
  createSelector(
    selectAdminSubscribePageDomain,
    state => state.one,
  );
export const makeSelectQuery = () =>
  createSelector(
    selectAdminSubscribePageDomain,
    state => state.query,
  );
