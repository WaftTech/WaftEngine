import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.categoryDetailPage || initialState;

export const makeSelectCategory = () =>
  createSelector(
    selectDomain,
    state => state.category,
  );

export const makeSelectBlog = () =>
  createSelector(
    selectDomain,
    state => state.blog,
  );
