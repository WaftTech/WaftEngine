import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');
const selectGlobal = state => state.get('global');

export const makeSelectLocation = () =>
  createSelector(selectRouter, routeState => routeState.get('location').toJS());

export const makeSelectIsAuthenticated = () =>
  createSelector(selectGlobal, state => !!state.get('token'));
export const makeSelectToken = () =>
  createSelector(selectGlobal, state => state.get('token'));
export const makeSelectUser = () =>
  createSelector(selectGlobal, state => state.get('user'));
export const makeSelectDialog = () =>
  createSelector(selectGlobal, state => state.get('dialog'));
export const makeSelectRequesting = () =>
  createSelector(selectGlobal, state => state.get('requesting'));
export const makeSelectSuccess = () =>
  createSelector(selectGlobal, state => state.get('success'));
export const makeSelectMessages = () =>
  createSelector(selectGlobal, state => state.get('messages'));
