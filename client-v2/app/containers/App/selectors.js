import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.router;

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const selectGlobal = state => state.global || initialState;

export const makeSelectIsAuthenticated = () =>
  createSelector(
    selectGlobal,
    state => !!state.token,
  );

export const makeSelectToken = () =>
  createSelector(
    selectGlobal,
    state => state.token,
  );

export const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    state => state.user,
  );

export const makeSelectUserIsAdmin = () =>
  createSelector(
    makeSelectUser(),
    state => state.isAdmin,
  );

export const makeSelectContent = () =>
  createSelector(
    selectGlobal,
    state => state.content,
  );

export const makeSelectMedia = () =>
  createSelector(
    selectGlobal,
    state => state.media,
  );

export const makeSelectSlide = () =>
  createSelector(
    selectGlobal,
    state => state.slide,
  );

export const makeSelectNotifications = () =>
  createSelector(
    selectGlobal,
    state => state.notifications,
  );
