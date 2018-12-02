import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');
const selectGlobal = state => state.get('global');

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectIsAuthenticated = () =>
  createSelector(selectGlobal, state => !!state.get('token'));
const makeSelectToken = () =>
  createSelector(selectGlobal, state => state.get('token'));
const makeSelectUser = () =>
  createSelector(selectGlobal, state => state.get('user'));
const makeSelectDialog = () =>
  createSelector(selectGlobal, state => state.get('dialog'));
const makeSelectRequesting = () =>
  createSelector(selectGlobal, state => state.get('requesting'));
const makeSelectSuccess = () =>
  createSelector(selectGlobal, state => state.get('success'));
const makeSelectMessages = () =>
  createSelector(selectGlobal, state => state.get('messages'));

export {
  makeSelectLocation,
  makeSelectIsAuthenticated,
  makeSelectToken,
  makeSelectUser,
  makeSelectDialog,
  makeSelectRequesting,
  makeSelectSuccess,
  makeSelectMessages,
};
