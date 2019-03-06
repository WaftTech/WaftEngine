import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');
const selectGlobal = state => state.get('global');

export const makeSelectLocation = () => createSelector(selectRouter, routerState => routerState.get('location').toJS());

export const makeSelectIsAuthenticated = () => createSelector(selectGlobal, state => !!state.get('token'));
export const makeSelectSuccess = () => createSelector(selectGlobal, state => state.get('success'));
export const makeSelectToken = () => createSelector(selectGlobal, state => state.get('token'));
export const makeSelectUser = () => createSelector(selectGlobal, state => state.get('user'));
export const makeSelectDialog = () => createSelector(selectGlobal, state => state.get('dialog'));
export const makeSelectRequesting = () => createSelector(selectGlobal, state => state.get('requesting'));
export const makeSelectIsRequesting = () => createSelector(selectGlobal, state => state.get('isRequesting'));
export const makeSelectMsg = () => createSelector(selectGlobal, state => state.get('successMessage'));
export const makeSelectErrorMsg = () => createSelector(selectGlobal, state => state.get('errorMessage'));
export const makeSelectContent = () => createSelector(selectGlobal, state => state.get('contents'));
export const makeSelectMedia = () => createSelector(selectGlobal, state => state.get('media'));
