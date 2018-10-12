import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('homePage', initialState);

export const makeSelectFourorg = () =>
  createSelector(selectDomain, state => state.get('fourorg'));
