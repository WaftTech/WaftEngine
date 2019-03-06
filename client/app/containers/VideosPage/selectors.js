import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('videoPage', initialState);

export const makeSelectVideos = () => createSelector(selectDomain, state => state.get('videos'));
