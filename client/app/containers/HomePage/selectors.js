import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('homePage', initialState);
