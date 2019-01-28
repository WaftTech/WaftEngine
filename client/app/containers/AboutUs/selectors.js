import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('aboutUs', initialState);

export const makeSelectAboutUs = () => createSelector(selectDomain, state => state.get('aboutUs'));
