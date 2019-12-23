import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingsManagePage state domain
 */

export const selectDomain = state => state.settingsManagePage || initialState;

/**
 * Default selector used by SettingsManagePage
 */

export const makeSelectSettings = () =>
  createSelector(
    selectDomain,
    state => state.all,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );

export const makeSelectSettingsNormalized = () =>
  createSelector(
    selectDomain,
    state => state.settings_normalized,
  );
