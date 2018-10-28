import { fromJS } from 'immutable';
import startPageReducer from '../reducer';

describe('startPageReducer', () => {
  it('returns the initial state', () => {
    expect(startPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
