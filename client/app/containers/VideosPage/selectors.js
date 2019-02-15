import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('videos', initialState);

export const makeSelectVideos = () => createSelector(selectDomain, state => state.get('videos'));
