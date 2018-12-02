import { fromJS } from 'immutable';
import rashifalListPageReducer from '../reducer';

describe('rashifalListPageReducer', () => {
  it('returns the initial state', () => {
    expect(rashifalListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
