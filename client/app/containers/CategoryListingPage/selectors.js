import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.categoryListingPage || initialState;

export const makeSelectCategory = () =>
  createSelector(
    selectDomain,
    state => state.category,
  );

export const makeSelectBlogs = () =>
  createSelector(
    selectDomain,
    state => state.blogs,
  );
