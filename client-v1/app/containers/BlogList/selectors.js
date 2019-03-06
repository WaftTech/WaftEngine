import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('blogList', initialState);

export const makeSelectBlogList = () =>
  createSelector(selectDomain, state => state.get('blogList'));
