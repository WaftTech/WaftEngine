import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the startPage state domain
 */

export const selectStartPageDomain = state =>
  state.get('startPage', initialState);

/**
 * Other specific selectors
 */
export const makeSelectIsRequesting = () =>
  createSelector(selectStartPageDomain, substate =>
    substate.get('isRequesting'),
  );
export const makeSelectErrors = () =>
  createSelector(selectStartPageDomain, substate => substate.get('errors'));
/**
 * Default selector used by StartPage
 */

const makeSelectStartPage = () =>
  createSelector(selectStartPageDomain, substate => substate.toJS());

export default makeSelectStartPage;
