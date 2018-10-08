import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the videoLinkPage state domain
 */

const selectVideoLinkPageDomain = state =>
  state.get('videoLinkPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoLinkPage
 */

const makeSelectVideoLinkPage = () =>
  createSelector(selectVideoLinkPageDomain, substate => substate.toJS());

export default makeSelectVideoLinkPage;
export { selectVideoLinkPageDomain };
