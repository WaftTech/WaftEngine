import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state =>
  state.get('homePageSearchComponent', initialState);

export const makeSelectCategories = () =>
  createSelector(selectDomain, state => state.get('categories'));
