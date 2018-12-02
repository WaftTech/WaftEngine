import { fromJS } from 'immutable';
import searchResultsPageReducer from '../reducer';

describe('searchResultsPageReducer', () => {
  it('returns the initial state', () => {
    expect(searchResultsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
