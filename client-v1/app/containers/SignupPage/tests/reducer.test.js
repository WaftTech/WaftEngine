import { fromJS } from 'immutable';
import signupPageReducer from '../reducer';

describe('signupPageReducer', () => {
  it('returns the initial state', () => {
    expect(signupPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
