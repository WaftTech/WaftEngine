import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('categoryDetailPage', initialState);

export const makeSelectCategory = () =>
  createSelector(selectDomain, state => state.get('category'));

export const makeSelectBlog = () => createSelector(selectDomain, state => state.get('blog'));
