import { fromJS } from 'immutable';
import resetPasswordPageReducer from '../reducer';

describe('resetPasswordPageReducer', () => {
  it('returns the initial state', () => {
    expect(resetPasswordPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
