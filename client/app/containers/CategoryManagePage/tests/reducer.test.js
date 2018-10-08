import { fromJS } from 'immutable';
import categoryManagePageReducer from '../reducer';

describe('categoryManagePageReducer', () => {
  it('returns the initial state', () => {
    expect(categoryManagePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
