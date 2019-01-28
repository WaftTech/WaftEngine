import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRoute = state => state.get('route');
const selectGlobal = state => state.get('global');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectIsAuthenticated = () => createSelector(selectGlobal, state => !!state.get('token'));
const makeSelectToken = () => createSelector(selectGlobal, state => state.get('token'));
const makeSelectUser = () => createSelector(selectGlobal, state => state.get('user'));
const makeSelectDialog = () => createSelector(selectGlobal, state => state.get('dialog'));
const makeSelectRequesting = () => createSelector(selectGlobal, state => state.get('requesting'));

export const makeSelectIsRequesting = () =>
  createSelector(selectGlobal, state => state.get('isRequesting'));

export const makeSelectSuccess = () => createSelector(selectGlobal, state => state.get('success'));
export const makeSelectMsg = () =>
  createSelector(selectGlobal, state => state.get('successMessage'));
export const makeSelectErrorMsg = () =>
  createSelector(selectGlobal, state => state.get('errorMessage'));
export const makeSelectContent = () => createSelector(selectGlobal, state => state.get('contents'));
export const makeSelectMedia = () => createSelector(selectGlobal, state => state.get('media'));

export {
  makeSelectLocation,
  makeSelectIsAuthenticated,
  makeSelectToken,
  makeSelectUser,
  makeSelectDialog,
  makeSelectRequesting,
  // makeSelectSuccess,
};
