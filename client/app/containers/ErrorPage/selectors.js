import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('errorPage', initialState);

export const makeSelectError = () => createSelector(selectDomain, state => state.get('errors'));
export const makeSelectPage = () => createSelector(selectDomain, state => state.get('page'));
