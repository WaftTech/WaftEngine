import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.get('faq', initialState);

export const makeSelectFAQ = () => createSelector(selectDomain, state => state.get('faq'));
