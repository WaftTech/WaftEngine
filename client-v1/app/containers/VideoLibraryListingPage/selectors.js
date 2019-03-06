import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('videoLibraryList', initialState);

export const makeSelectVideoLibraryList = () => createSelector(selectDomain, state => state.get('videoLibraryList'));
