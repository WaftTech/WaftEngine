import { fromJS } from 'immutable';
import adsListingPageReducer from '../reducer';

describe('videoLibraryListingPageReducer', () => {
  it('returns the initial state', () => {
    expect(videoLibraryListingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
