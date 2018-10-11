import { fromJS } from 'immutable';
import categoryDetailPageReducer from '../reducer';

describe('categoryDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(categoryDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
