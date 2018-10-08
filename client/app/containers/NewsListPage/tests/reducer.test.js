import { fromJS } from 'immutable';
import newsListPageReducer from '../reducer';

describe('newsListPageReducer', () => {
  it('returns the initial state', () => {
    expect(newsListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
