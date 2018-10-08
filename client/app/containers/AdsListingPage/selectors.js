import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the adsListingPage state domain
 */

const selectAdsListingPageDomain = state =>
  state.get('adsListingPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AdsListingPage
 */

const makeSelectAdsListingPage = () =>
  createSelector(selectAdsListingPageDomain, substate => substate.toJS());

export default makeSelectAdsListingPage;
export { selectAdsListingPageDomain };
