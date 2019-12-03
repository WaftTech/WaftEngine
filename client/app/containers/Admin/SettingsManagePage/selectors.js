import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingsManagePage state domain
 */

export const selectDomain = state => state.settingsManagePage || initialState;

/**
 * Other specific selectors
 */

export const makeSelectDefaultData = () =>
  createSelector(
    selectDomain,
    state => state.defaultData,
  );

/**
 * Default selector used by SettingsManagePage
 */

const makeSelectSettingsManagePage = () =>
  createSelector(
    selectDomain,
    substate => substate,
  );

export default makeSelectSettingsManagePage;
