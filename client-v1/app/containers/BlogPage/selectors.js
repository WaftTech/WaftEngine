import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('blogPage', initialState);

export const makeSelectBlog = () => createSelector(selectDomain, state => state.get('blog'));
