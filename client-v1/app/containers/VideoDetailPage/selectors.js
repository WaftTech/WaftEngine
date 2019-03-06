import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('videoDetailPage', initialState);

export const makeSelectVideoDetail = () => createSelector(selectDomain, state => state.get('videoDetail'));
