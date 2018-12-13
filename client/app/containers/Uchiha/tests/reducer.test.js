import { fromJS } from 'immutable';
import uchihaReducer from '../reducer';

describe('uchihaReducer', () => {
  it('returns the initial state', () => {
    expect(uchihaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
