import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('contactUs', initialState);

export const makeSelectIsRequesting = () =>
  createSelector(selectDomain, state => state.get('isRequesting'));

export const makeSelectSuccess = () => createSelector(selectDomain, state => state.get('success'));
export const makeSelectMsg = () =>
  createSelector(selectDomain, state => state.get('successMessage'));
export const makeSelectErrorMsg = () =>
  createSelector(selectDomain, state => state.get('errorMessage'));
export const makeSelectContactDetail = () =>
  createSelector(selectDomain, state => state.get('contactDetail'));
