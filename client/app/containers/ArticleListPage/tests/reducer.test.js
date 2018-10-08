import { fromJS } from 'immutable';
import articleListPageReducer from '../reducer';

describe('articleListPageReducer', () => {
  it('returns the initial state', () => {
    expect(articleListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
