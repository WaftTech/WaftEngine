import { fromJS } from 'immutable';
import moduleCreatePageReducer from '../reducer';

describe('moduleCreatePageReducer', () => {
  it('returns the initial state', () => {
    expect(moduleCreatePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
