import { fromJS } from 'immutable';
import adsListingPageReducer from '../reducer';

describe('adsListingPageReducer', () => {
  it('returns the initial state', () => {
    expect(adsListingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
