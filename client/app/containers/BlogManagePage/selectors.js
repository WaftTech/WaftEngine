import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offerManagePage state domain
 */

const selectDomain = state => state.get('blogManagePage', initialState);

export const makeSelectAll = () => createSelector(selectDomain, state => state.get('all'));
export const makeSelectOne = () => createSelector(selectDomain, state => state.get('one'));
// export const makeSelectBlog = () => createSelector(selectDomain, state => state.get('blog'));
export const makeSelectCategory = () =>
  createSelector(selectDomain, state => state.get('category'));
export const makeSelectPage = () => createSelector(selectDomain, state => state.get('page'));
