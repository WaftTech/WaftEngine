import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the aboutUs state domain
 */

const selectDomain = state => state.get('aboutUs', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AboutUs
 */

export const makeSelectAboutUs = () => createSelector(selectDomain, state => state.get('aboutUs'));
